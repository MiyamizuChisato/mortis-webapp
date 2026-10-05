package uno.mortis.lacus.core.auth.dto

data class RegisterDto(
    val nickname: String,
    val email: String,
    val code: String,
    var password: String,
)

data class ResetPasswordDto(
    val email: String,
    val code: String,
    var password: String
)

data class BindEmailDto(
    val email: String,
    val code: String,
    var password: String,
)

data class SetPasswordDto(
    val email: String,
    val oldPassword: String,
    var newPassword: String,
)

data class UnbindSocialDto(
    val source: String,
)

data class LoginDto(
    val email: String,
    val password: String
)