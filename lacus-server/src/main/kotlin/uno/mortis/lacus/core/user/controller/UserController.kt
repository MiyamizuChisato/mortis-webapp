package uno.mortis.lacus.core.user.controller

import org.springframework.web.bind.annotation.*
import uno.mortis.lacus.common.component.CacheClient
import uno.mortis.lacus.common.utils.AuthUtils
import uno.mortis.lacus.core.user.dto.UserAccountUpdateDto
import uno.mortis.lacus.core.user.dto.UserAvatarUpdateDto
import uno.mortis.lacus.core.user.entity.UserAccount
import uno.mortis.lacus.core.user.service.UserService
import java.time.Duration

@RestController
@RequestMapping("/user")
class UserController(
    private val userService: UserService,
    private val cacheClient: CacheClient
) {
    @GetMapping
    fun getUserAccount(userAccount: UserAccount): List<UserAccount> {
        return userService.getUserAccount(userAccount)
    }

    @PutMapping
    fun updateUserAccount(userAccountUpdateDto: UserAccountUpdateDto) {
        userService.updateUserAccount(userAccountUpdateDto)
    }

    @PutMapping("/avatar")
    fun updateUserAvatar(userAvatarUpdateDto: UserAvatarUpdateDto) {
        userService.updateUserAvatar(userAvatarUpdateDto)
    }

    @GetMapping("/{id}")
    fun getUserAccount(@PathVariable id: Long): UserAccount? {
        return cacheClient.getWithSet<UserAccount>(
            "user:${id}",
            { userService.getUserById(id) },
            Duration.ofHours(1)
        )
    }

    @GetMapping("/role")
    fun getUserRole(): List<String> {
        return userService.getRoleByUserId(AuthUtils.getLoginId())
    }

    @GetMapping("/social")
    fun getUserSocialList(): List<String> {
        return userService.getUserSocialList()
    }

    @GetMapping("/me")
    fun getUserAccount(): UserAccount? {
        return getUserAccount(AuthUtils.getLoginId())
    }
}