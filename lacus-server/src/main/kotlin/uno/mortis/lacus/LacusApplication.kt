package uno.mortis.lacus

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class LacusApplication

fun main(args: Array<String>) {
    runApplication<LacusApplication>(*args)
}
