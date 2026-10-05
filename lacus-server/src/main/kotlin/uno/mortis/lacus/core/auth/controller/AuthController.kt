package uno.mortis.lacus.core.auth.controller

import cn.dev33.satoken.stp.SaTokenInfo
import org.springframework.web.bind.annotation.*
import uno.mortis.lacus.common.component.CacheClient
import uno.mortis.lacus.common.result.ServerException
import uno.mortis.lacus.common.utils.ifFalse
import uno.mortis.lacus.common.utils.ifNull
import uno.mortis.lacus.core.auth.dto.*
import uno.mortis.lacus.core.auth.service.AuthService

@RestController
@RequestMapping("/auth")
class AuthController(
    private val authService: AuthService,
    private val cacheClient: CacheClient
) {

    @PostMapping("/unbind-social")
    fun resetPassword(@RequestBody input: UnbindSocialDto) {
        authService.unbindSocial(input)
    }

    @PostMapping("/bind-email")
    fun resetPassword(@RequestBody input: BindEmailDto) {
        authService.bindEmail(input)
    }

    @PostMapping("/reset-password")
    fun resetPassword(@RequestBody input: ResetPasswordDto) {
        val code = cacheClient.get<String>("register:code:${input.email}")
        code.ifNull {
            throw ServerException("CODE ERROR")
        }
        (code == input.code).ifFalse {
            throw ServerException("CODE ERROR")
        }
        authService.resetPassword(input)
        cacheClient.remove("register:code:${input.email}")
    }

    @PostMapping("/set-password")
    fun resetPassword(@RequestBody input: SetPasswordDto) {
        authService.setPassword(input)
    }

    @PostMapping("/login")
    fun login(@RequestBody input: LoginDto): SaTokenInfo? {
        return authService.loginWithPassword(input)
    }

    @PostMapping("/register")
    fun register(@RequestBody input: RegisterDto): SaTokenInfo? {
        val code = cacheClient.get<String>("register:code:${input.email}")
        code.ifNull {
            throw ServerException("CODE ERROR")
        }
        (code == input.code).ifFalse {
            throw ServerException("CODE ERROR")
        }
        val tokenInfo = authService.registerAndLogin(input)
        cacheClient.remove("register:code:${input.email}")
        return tokenInfo
    }

    @GetMapping("/{source}")
    fun getOauthPath(@PathVariable("source") source: String) {
        TODO()
    }

    @GetMapping("/{source}/callback")
    fun oauthCallback(@PathVariable("source") source: String) {
        TODO()
    }
}