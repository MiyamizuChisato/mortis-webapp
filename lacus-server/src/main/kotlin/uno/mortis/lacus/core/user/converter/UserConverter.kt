package uno.mortis.lacus.core.user.converter

import org.mapstruct.Mapper
import org.mapstruct.ReportingPolicy
import uno.mortis.lacus.core.auth.dto.RegisterDto
import uno.mortis.lacus.core.user.dto.UserAccountUpdateDto
import uno.mortis.lacus.core.user.entity.UserAccount

@Mapper(
    componentModel = "spring",
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
interface UserConverter {
    fun toUserAccount(registerDto: RegisterDto): UserAccount
    fun toUserAccount(userAccountUpdateDto: UserAccountUpdateDto): UserAccount
}