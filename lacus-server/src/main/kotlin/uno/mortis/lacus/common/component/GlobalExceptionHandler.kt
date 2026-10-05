package uno.mortis.lacus.common.component

import cn.dev33.satoken.exception.NotLoginException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import uno.mortis.lacus.common.result.ApiResult
import uno.mortis.lacus.common.result.ServerException

@RestControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(ServerException::class)
    fun handleException(e: ServerException): ApiResult<Unit> {
        return ApiResult.defeat(e.message)
    }

    @ExceptionHandler(NotLoginException::class)
    fun handleException(): ApiResult<Unit> {
        return ApiResult.defeat("NOT LOGIN")
    }

    @ExceptionHandler(Exception::class)
    fun handleException(e: Exception): ApiResult<Unit> {
        return ApiResult.defeat(e.message)
    }
}