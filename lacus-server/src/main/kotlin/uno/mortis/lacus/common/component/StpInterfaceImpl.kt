package uno.mortis.lacus.common.component

import cn.dev33.satoken.stp.StpInterface
import org.springframework.stereotype.Component
import uno.mortis.lacus.core.user.mapper.UserRoleMapper
import java.time.Duration

@Component
class StpInterfaceImpl(
    val userRoleMapper: UserRoleMapper,
    val cacheClient: CacheClient
) : StpInterface {
    override fun getPermissionList(
        loginId: Any?,
        loginType: String?
    ): List<String?>? {
        return listOf("*")
    }

    override fun getRoleList(
        loginId: Any?,
        loginType: String?
    ): List<String?>? {
        return cacheClient.getWithSet(
            "user:role:${loginId}",
            { userRoleMapper.selectRoleByUserId(loginId as Long) },
            Duration.ofHours(1)
        )
    }
}