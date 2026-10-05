package uno.mortis.lacus.core.mail.dto

data class VerifyMailDto(
    val to: String,
    val code: String,
)