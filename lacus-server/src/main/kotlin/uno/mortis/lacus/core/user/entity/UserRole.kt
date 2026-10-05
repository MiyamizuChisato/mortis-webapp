package uno.mortis.lacus.core.user.entity

import com.baomidou.mybatisplus.annotation.TableName

@TableName("user_role")
data class UserRole(
    val userId: Long,
    val roleId: Long
)
