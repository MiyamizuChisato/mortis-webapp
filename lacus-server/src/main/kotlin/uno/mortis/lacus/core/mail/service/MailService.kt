package uno.mortis.lacus.core.mail.service

import org.springframework.beans.factory.annotation.Value
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service
import org.thymeleaf.TemplateEngine
import org.thymeleaf.context.Context
import uno.mortis.lacus.core.mail.dto.VerifyMailDto


@Service
class MailService(
    @Value($$"${spring.mail.username}")
    private val from: String,
    private val javaMailSender: JavaMailSender,
    private val templateEngine: TemplateEngine
) {
    fun sendVerifyCodeEmail(input: VerifyMailDto) {
        val context = Context()
        context.setVariable("code", input.code)
        val mimeMessage = javaMailSender.createMimeMessage()
        val helper = MimeMessageHelper(mimeMessage, true, "UTF-8")
        val content = templateEngine.process("verify", context)
        helper.setFrom(from)
        helper.setSubject("Sign Up")
        helper.setTo(input.to)
        helper.setText(content, true)
        javaMailSender.send(mimeMessage)
    }
}