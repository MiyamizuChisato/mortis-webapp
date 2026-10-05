package uno.mortis.lacus.core.mail.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import uno.mortis.lacus.common.component.CacheClient
import uno.mortis.lacus.common.result.ServerException
import uno.mortis.lacus.common.utils.ifTrue
import uno.mortis.lacus.core.mail.dto.VerifyMailDto
import uno.mortis.lacus.core.mail.service.MailService
import java.security.SecureRandom
import java.time.Duration

@RestController
@RequestMapping("/mail")
class MailController(
    private val cacheClient: CacheClient,
    private val mailService: MailService
) {
    @GetMapping("/verify/{email}")
    fun sendVerifyCode(@PathVariable("email") email: String) {
        val times = cacheClient.get<Int?>("verify:times:${email}")
        (times != null && times >= 3).ifTrue {
            throw ServerException("OPERATE BUSY")
        }
        val code = SecureRandom().nextInt(1_000_000).toString().padStart(6, '0')
        mailService.sendVerifyCodeEmail(
            VerifyMailDto(
                to = email,
                code = code
            )
        )
        cacheClient.setWithLogicalExpire("verify:code:${email}", code, Duration.ofMinutes(20))
        cacheClient.setWithLogicalExpire(
            "verify:times:${email}",
            if (times == null) 1 else times + 1,
            Duration.ofMinutes(20)
        )
    }
}