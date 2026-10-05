package uno.mortis.lacus.core.user.entity

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName
import java.time.LocalDate
import java.time.LocalDateTime

@TableName("user_account")
data class UserAccount(
    @TableId(type = IdType.AUTO)
    var id: Long?,
    var nickname: String?,
    var motto: String?,
    var birthday: LocalDate?,
    var profession: String?,
    var address: String?,
    var phone: String?,
    var email: String?,
    var gender: String?,
    var password: String?,
    var website: String?,
    var avatar: String?,
    var createTime: LocalDateTime?,
    var updateTime: LocalDateTime?,
)
