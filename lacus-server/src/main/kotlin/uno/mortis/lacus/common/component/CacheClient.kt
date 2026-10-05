package uno.mortis.lacus.common.component

import org.springframework.data.redis.core.StringRedisTemplate
import org.springframework.stereotype.Component
import tools.jackson.core.type.TypeReference
import tools.jackson.databind.ObjectMapper
import java.time.Duration


@Component
final class CacheClient(
    val redis: StringRedisTemplate,
    val objectMapper: ObjectMapper
) {
    fun remove(key: String) {
        redis.delete(key)
    }

    fun setWithLogicalExpire(key: String, value: String, timeout: Duration) {
        redis.opsForValue().set(key, value, timeout)
    }

    fun <T> setWithLogicalExpire(key: String, value: T?, timeout: Duration) {
        redis.opsForValue().set(key, objectMapper.writeValueAsString(value), timeout)
    }

    inline fun <reified T> get(key: String): T? {
        val value = redis.opsForValue().get(key)
            ?: return null
        return objectMapper.readValue(
            value,
            object : TypeReference<T>() {}
        )
    }

    inline fun <reified T : Any> getWithSet(key: String, callback: () -> T?, timeout: Duration): T? {
        val value = redis.opsForValue().get(key)
        if (value == null) {
            val data = callback()
            setWithLogicalExpire(key = key, value = data, timeout = timeout)
            return data
        } else {
            return objectMapper.readValue(
                value,
                object : TypeReference<T>() {}
            )
        }
    }
}
