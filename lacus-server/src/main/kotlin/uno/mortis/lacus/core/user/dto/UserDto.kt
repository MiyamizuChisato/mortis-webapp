package uno.mortis.lacus.core.user.dto

import java.time.LocalDate

data class UserAccountUpdateDto(
    val nickname: String?,
    val motto: String?,
    val birthday: LocalDate?,
    val profession: String?,
    val address: String?,
    val phone: String?,
    val gender: String?,
    val website: String?,
)

data class UserAvatarUpdateDto(
    val newAvatar: String,
    val oldAvatar: String,
)

