<script setup lang="ts">
import type { UserConfig } from '#server/repository/user.repo'
import dayjs from 'dayjs'
import equal from 'fast-deep-equal/es6'
import { toDate } from 'reka-ui/date'
import { Calendar } from '~/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { useUserStore } from '~/store/userStore'

defineProps<{
  user: UserConfig
  editable: boolean
}>()
const editing = ref(false)
const { t } = useI18n()
const userStore = useUserStore()
const { userProfile, userRoleList } = storeToRefs(userStore)
const uploading = ref(false)
const userProfileCopied = ref<UserConfig>()
async function userAvatarChange(event: Event) {
  uploading.value = true
  const target = event?.target as HTMLInputElement
  const files = target?.files
  if (!files) {
    return
  }
  // 先获取presigned url
  const file = files[0]
  const { key, url } = await useHttp().post<{ key: string, url: string }>(
    '/file/presigned',
    {
      folder: 'avatar',
      filename: file?.name,
      contentType: file?.type,
      useDate: true,
    },
  )
  // 上传图片
  await $fetch(url, { method: 'PUT', body: file })
  // 修改数据库
  const avatar = await useHttp().put<string>('/user/avatar', {
    id: userProfileCopied.value?.id,
    newAvatar: key,
    oldAvatar: userProfileCopied.value?.avatar,
  })
  userStore.$patch({
    userProfile: {
      avatar,
    },
  })
  if (userProfileCopied.value) {
    userProfileCopied.value.avatar = avatar
  }
  uploading.value = false
}
async function saveUserProfile() {
  if (equal(userProfileCopied.value, userProfile.value)) {
    userProfileCopied.value = undefined
    editing.value = false
  }
  else {
    userStore.$patch({
      userProfile: toRaw(userProfileCopied.value),
    })
    userProfileCopied.value = undefined
    editing.value = false
    await useHttp().put('/user', userProfile.value)
  }
}
function editUserProfile() {
  userProfileCopied.value = structuredClone(toRaw(userProfile.value))
  editing.value = true
}
</script>

<template>
  <div v-auto-animate class="space-y-4">
    <template v-if="editing && userProfileCopied">
      <div class="bg-card rounded-xl divide-y divide-dashed">
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[solar--gallery-minimalistic-bold-duotone]" />
            <span>
              {{ t("user.profile.avatar") }}
            </span>
          </div>
          <div>
            <Button class="size-20 rounded-full" variant="ghost">
              <Label for="avatar">
                <Avatar class="size-16 flex justify-center items-center">
                  <Icon v-if="uploading" name="icon-[svg-spinners--ring-resize]" />
                  <AvatarImage v-else :src="userProfileCopied.avatar || ''" />
                </Avatar>
                <Input id="avatar" hidden type="file" class="bg-accent" @change="userAvatarChange" />
              </Label>
            </Button>
          </div>
        </div>
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[solar--text-field-focus-bold-duotone]" />
            <span>
              {{ t("user.profile.nickname") }}
            </span>
          </div>
          <div>
            <Input v-model="userProfileCopied.nickname" class="bg-accent" />
          </div>
        </div>
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[solar--key-minimalistic-square-2-bold-duotone]" />
            <span>
              {{ t("user.profile.motto") }}
            </span>
          </div>
          <div>
            <Input v-model="userProfileCopied.motto" class="bg-accent" />
          </div>
        </div>
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[solar--user-rounded-bold-duotone]" />
            <span>
              {{ t("user.profile.gender") }}
            </span>
          </div>
          <div>
            <Select v-model="userProfileCopied.gender">
              <SelectTrigger class="bg-accent">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent class="p-1">
                <SelectItem value="MAN">
                  {{ t("user.gender.man") }}
                </SelectItem>
                <SelectItem value="WOMAN">
                  {{ t("user.gender.woman") }}
                </SelectItem>
                <SelectItem value="UNKNOWN">
                  {{ t("user.gender.unknown") }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[solar--calendar-bold-duotone]" />
            <span>
              {{ t("user.profile.birthday") }}
            </span>
          </div>
          <div>
            <Popover v-slot="{ close }">
              <PopoverTrigger as-child>
                <Button
                  id="date"
                  variant="outline"
                  class="w-48 justify-between font-normal bg-accent"
                >
                  {{
                    userProfileCopied.birthday ? dayjs(userProfileCopied.birthday).format('YYYY-MM-DD') : t("user.profile.choseDate")
                  }}
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  layout="month-and-year"
                  @update:model-value="(value) => {
                    if (value && userProfileCopied) {
                      userProfileCopied.birthday = dayjs(toDate(value)).format('YYYY-MM-DD')
                      close()
                    }
                  }"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[solar--home-bold-duotone]" />
            <span>
              {{ t("user.profile.location") }}
            </span>
          </div>
          <div>
            <Input v-model="userProfileCopied.address" class="bg-accent" />
          </div>
        </div>
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[solar--buildings-bold-duotone]" />
            <span>
              {{ t("user.profile.profession") }}
            </span>
          </div>
          <div>
            <Input v-model="userProfileCopied.profession" class="bg-accent" />
          </div>
        </div>
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[solar--global-bold-duotone]" />
            <span>
              {{ t("user.profile.website") }}
            </span>
          </div>
          <div>
            <Input v-model="userProfileCopied.website" class="bg-accent" />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="bg-card rounded-xl divide-y divide-dashed">
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[solar--medal-ribbons-star-bold-duotone]" />
            <span>
              {{ t("user.profile.tag") }}
            </span>
          </div>
          <div class="space-x-2">
            <Badge v-for="role in userRoleList" :key="role" variant="secondary">
              {{ role }}
            </Badge>
          </div>
        </div>
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[solar--compass-bold-duotone]" />
            <span>
              {{ t("user.profile.createDate") }}
            </span>
          </div>
          <span>
            {{ user?.createTime ? dayjs(user.createTime).format("YYYY-MM-DD") : '-' }}
          </span>
        </div>
      </div>
      <div class="bg-card rounded-xl divide-y divide-dashed">
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[solar--user-rounded-bold-duotone]" />
            <span>
              {{ t("user.profile.gender") }}
            </span>
          </div>
          <span>
            {{ user?.gender ? t(`user.gender.${user.gender.toLocaleLowerCase()}`) : '-' }}
          </span>
        </div>
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[solar--calendar-bold-duotone]" />
            <span>
              {{ t("user.profile.birthday") }}
            </span>
          </div>
          <span>
            {{ user?.birthday ? dayjs(user.birthday).format("YYYY-MM-DD") : '-' }}
          </span>
        </div>
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[solar--home-bold-duotone]" />
            <span>
              {{ t("user.profile.location") }}
            </span>
          </div>
          <span>
            {{ user?.address || '-' }}
          </span>
        </div>
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[solar--buildings-bold-duotone]" />
            <span>
              {{ t("user.profile.profession") }}
            </span>
          </div>
          <span>
            {{ user?.profession || '-' }}
          </span>
        </div>
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[solar--global-bold-duotone]" />
            <span>
              {{ t("user.profile.website") }}
            </span>
          </div>
          <span>
            {{ user?.website || '-' }}
          </span>
        </div>
      </div>
    </template>
  </div>
  <ClientOnly v-if="editable">
    <Teleport to="#user-info-option" defer>
      <Button v-if="editing" variant="outline" @click="saveUserProfile">
        {{ t("user.save") }}
      </Button>
      <Button v-else variant="outline" @click="editUserProfile">
        {{ t("user.edit") }}
      </Button>
    </Teleport>
  </ClientOnly>
</template>
