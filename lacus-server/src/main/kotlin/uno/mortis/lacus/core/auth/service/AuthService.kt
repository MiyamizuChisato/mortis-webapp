package uno.mortis.lacus.core.auth.service

import cn.dev33.satoken.stp.SaTokenInfo
import cn.dev33.satoken.stp.StpUtil
import com.baomidou.mybatisplus.core.toolkit.Wrappers
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import uno.mortis.lacus.common.result.ServerException
import uno.mortis.lacus.common.utils.AuthUtils
import uno.mortis.lacus.common.utils.ifFalse
import uno.mortis.lacus.common.utils.ifNotNull
import uno.mortis.lacus.common.utils.ifNull
import uno.mortis.lacus.core.auth.dto.*
import uno.mortis.lacus.core.user.converter.UserConverter
import uno.mortis.lacus.core.user.entity.UserSocial
import uno.mortis.lacus.core.user.mapper.UserAccountMapper
import uno.mortis.lacus.core.user.mapper.UserSocialMapper
import uno.mortis.lacus.core.user.service.UserService


@Service
class AuthService(
    private val userAccountMapper: UserAccountMapper,
    private val userSocialMapper: UserSocialMapper,
    private val userService: UserService,
    private val userConverter: UserConverter
) {
    fun loginWithPassword(input: LoginDto): SaTokenInfo? {
        val userAccount = userService.getUserByEmail(input.email)
        userAccount.ifNull {
            throw ServerException("EMAIL OR PASSWORD INCORRECT")
        }
        val crypto = BCryptPasswordEncoder()
        crypto.matches(input.password, userAccount?.password).ifFalse {
            throw ServerException("EMAIL OR PASSWORD INCORRECT")
        }
        StpUtil.login(userAccount?.id)
        return StpUtil.getTokenInfo()
    }

    fun registerAndLogin(input: RegisterDto): SaTokenInfo? {
        val exists = userService.getUserByEmail(input.email)
        exists.ifNotNull {
            throw ServerException("EMAIL USED")
        }
        val crypto = BCryptPasswordEncoder()
        val userAccount = userConverter.toUserAccount(input)
        userAccount.password = crypto.encode(input.password).toString()
        userAccountMapper.insert(userAccount)
        StpUtil.login(userAccount.id)
        return StpUtil.getTokenInfo()
    }

    fun resetPassword(input: ResetPasswordDto) {
        val exists = userService.getUserByEmail(input.email)
        exists.ifNotNull {
            throw ServerException("EMAIL USED")
        }
        val userAccount = userService.getUserById(AuthUtils.getLoginId())
        val crypto = BCryptPasswordEncoder()
        userAccount?.password = crypto.encode(input.password).toString()
        userAccountMapper.updateById(userAccount)
    }

    fun setPassword(input: SetPasswordDto) {
        val userAccount = userService.getUserByEmail(input.email)
        val userId = AuthUtils.getLoginId()
        (userAccount?.id == userId).ifFalse {
            throw ServerException("USER NOT FOUND")
        }
        val crypto = BCryptPasswordEncoder()
        crypto.matches(input.oldPassword, userAccount?.password).ifFalse {
            throw ServerException("PASSWORD NOT MATCHES")
        }
        userAccount?.password = crypto.encode(input.newPassword).toString()
        userAccountMapper.updateById(userAccount)
    }

    fun bindEmail(input: BindEmailDto) {
        val exists = userService.getUserByEmail(input.email)
        exists.ifNotNull {
            throw ServerException("EMAIL USED")
        }
        val userAccount = userService.getUserById(AuthUtils.getLoginId())
        val crypto = BCryptPasswordEncoder()
        userAccount?.email = input.email
        userAccount?.password = crypto.encode(input.password).toString()
        userAccountMapper.updateById(userAccount)
    }

    fun unbindSocial(input: UnbindSocialDto) {
        val wrapper = Wrappers.lambdaQuery<UserSocial>()
        wrapper.eq(UserSocial::userId, AuthUtils.getLoginId())
        wrapper.eq(UserSocial::source, input.source)
        userSocialMapper.delete(wrapper)
    }
}