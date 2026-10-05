<script setup lang="ts">
import { InputGroup, InputGroupAddon, InputGroupInput } from '~/components/ui/input-group'

const active = ref(false)

const info = {
  administrator: 'Chisato',
  title: 'Mortis',
  description: '没什么大不了',
  website: 'mortis.uno',
  avatar: 'https://mortis.uno/avatar.png',
}
const { t } = useI18n()
</script>

<template>
  <div @mouseenter="active = true" @mouseleave="active = false">
    <h1
      class="text-center sticky top-20 text-7xl font-[DouyinSans] transition-[color]"
      :class="active ? 'text-muted-foreground/20' : '[-webkit-text-stroke:1px_color-mix(in_srgb,var(--deep)_20%,transparent)] text-transparent'"
    >
      {{ t("friend.hero.title") }}
    </h1>
    <Tabs class="items-center mt-2" default-value="info">
      <TabsList class="mb-4">
        <TabsTrigger value="info">
          {{ t("friend.hero.tabs.info") }}
        </TabsTrigger>
        <TabsTrigger value="apply">
          {{ t("friend.hero.tabs.apply") }}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="info">
        <div class="space-y-2">
          <ButtonGroup>
            <ButtonGroupText as-child>
              <span>
                {{ t("friend.meta.administrator") }}
              </span>
            </ButtonGroupText>
            <InputGroup class="h-10 flex-1">
              <InputGroupInput id="administrator" v-model="info.administrator" readonly />
              <InputGroupAddon align="inline-end">
                <Button class="cursor-pointer" size="icon" variant="ghost">
                  <Icon name="icon-[solar--copy-line-duotone]" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </ButtonGroup>
          <ButtonGroup>
            <ButtonGroupText as-child>
              <span>
                {{ t("friend.meta.title") }}
              </span>
            </ButtonGroupText>
            <InputGroup class="h-10 flex-1">
              <InputGroupInput id="title" v-model="info.title" readonly />
              <InputGroupAddon align="inline-end">
                <Button class="cursor-pointer" size="icon" variant="ghost">
                  <Icon name="icon-[solar--copy-line-duotone]" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </ButtonGroup>
          <ButtonGroup>
            <ButtonGroupText as-child>
              <span>
                {{ t("friend.meta.description") }}
              </span>
            </ButtonGroupText>
            <InputGroup class="h-10 flex-1">
              <InputGroupInput id="description" v-model="info.description" readonly />
              <InputGroupAddon align="inline-end">
                <Button class="cursor-pointer" size="icon" variant="ghost">
                  <Icon name="icon-[solar--copy-line-duotone]" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </ButtonGroup>
          <ButtonGroup>
            <ButtonGroupText as-child>
              <span>
                {{ t("friend.meta.website") }}
              </span>
            </ButtonGroupText>
            <InputGroup class="h-10 flex-1">
              <InputGroupInput id="website" v-model="info.website" readonly />
              <InputGroupAddon align="inline-end">
                <Button class="cursor-pointer" size="icon" variant="ghost">
                  <Icon name="icon-[solar--copy-line-duotone]" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </ButtonGroup>
          <ButtonGroup>
            <ButtonGroupText as-child>
              <span>
                {{ t("friend.meta.avatar") }}
              </span>
            </ButtonGroupText>
            <InputGroup class="h-10 flex-1">
              <InputGroupInput id="avatar" v-model="info.avatar" readonly />
              <InputGroupAddon align="inline-end">
                <Button class="cursor-pointer" size="icon" variant="ghost">
                  <Icon name="icon-[solar--copy-line-duotone]" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </ButtonGroup>
        </div>
      </TabsContent>
      <TabsContent value="apply" class="space-y-2">
        <div class="space-y-1">
          <h3>
            {{ t("friend.rule") }}
          </h3>
          <p class="text-muted-foreground">
            1.{{ t("friend.ruleA") }}
          </p>
          <p class="text-muted-foreground">
            2.{{ t("friend.ruleB") }}
          </p>
        </div>
        <div>
          <h3>
            {{ t("friend.method") }}
          </h3>
          <p class="text-muted-foreground">
            1.{{ t("friend.methodA") }}
          </p>
          <p class="text-muted-foreground">
            2.{{ t("friend.methodB") }}
          </p>
        </div>
        <div class="text-muted-foreground">
          Tips：{{ t("friend.tips") }}
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>

<style scoped>

</style>
