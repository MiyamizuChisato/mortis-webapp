package uno.mortis.lacus.core.user.service

import com.baomidou.mybatisplus.core.toolkit.Wrappers
import org.springframework.stereotype.Service
import uno.mortis.lacus.common.utils.AuthUtils
import uno.mortis.lacus.core.user.converter.UserConverter
import uno.mortis.lacus.core.user.dto.UserAccountUpdateDto
import uno.mortis.lacus.core.user.dto.UserAvatarUpdateDto
import uno.mortis.lacus.core.user.entity.UserAccount
import uno.mortis.lacus.core.user.entity.UserSocial
import uno.mortis.lacus.core.user.mapper.UserAccountMapper
import uno.mortis.lacus.core.user.mapper.UserRoleMapper
import uno.mortis.lacus.core.user.mapper.UserSocialMapper

@Service
class UserService(
    private val userAccountMapper: UserAccountMapper,
    private val userSocialMapper: UserSocialMapper,
    private val userRoleMapper: UserRoleMapper,
    private val userConverter: UserConverter
) {
    fun getUserById(id: Long): UserAccount? {
        return userAccountMapper.selectById(id)
    }

    fun getUserByEmail(email: String): UserAccount? {
        val wrapper = Wrappers.lambdaQuery<UserAccount>()
        wrapper.eq(UserAccount::email, email)
        return userAccountMapper.selectOne(wrapper)
    }

    fun getUserSocialList(): List<String> {
        val wrapper = Wrappers.lambdaQuery<UserSocial>()
        wrapper.eq(UserSocial::userId, AuthUtils.getLoginId())
        val userSocials = userSocialMapper.selectList(wrapper)
        return userSocials.map { it.source }
    }

    fun getUserAccount(userAccount: UserAccount): List<UserAccount> {
        val wrapper = Wrappers.lambdaQuery<UserAccount>()
        wrapper.eq(userAccount.id != null, UserAccount::id, userAccount.id)
        wrapper.eq(userAccount.nickname != null, UserAccount::nickname, userAccount.nickname)
        wrapper.eq(userAccount.email != null, UserAccount::email, userAccount.email)
        wrapper.eq(userAccount.phone != null, UserAccount::phone, userAccount.phone)
        wrapper.eq(userAccount.profession != null, UserAccount::profession, userAccount.profession)
        return userAccountMapper.selectList(wrapper)
    }

    fun updateUserAccount(input: UserAccountUpdateDto) {
        val userAccount = userConverter.toUserAccount(input)
        userAccount.id = AuthUtils.getLoginId()
        userAccountMapper.updateById(userAccount)
    }

    fun getRoleByUserId(userId: Long): List<String> {
        return userRoleMapper.selectRoleByUserId(userId)
    }

    fun updateUserAvatar(userAvatarUpdateDto: UserAvatarUpdateDto) {
        TODO()
    }
}