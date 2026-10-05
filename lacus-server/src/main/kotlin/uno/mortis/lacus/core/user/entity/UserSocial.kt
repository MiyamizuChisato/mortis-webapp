package uno.mortis.lacus.core.user.entity

import com.baomidou.mybatisplus.annotation.TableName

@TableName("user_social")
data class UserSocial(
    var id: Long,
    var userId: Long,
    var uuid: Long,
    var accessToken: String,
    var refreshToken: String,
    var expireIn: String,
    var socialPath: String,
    var source: String
)
