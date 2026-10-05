package uno.mortis.lacus.common.result


data class ApiResult<T>(
    val payload: T?,
    val error: Boolean,
    val message: String,
) {
    companion object {
        fun <T> success(payload: T, message: String = "SUCCESS"): ApiResult<T> {
            return ApiResult(
                payload = payload,
                message = message,
                error = false,
            )
        }

        fun defeat(message: String?): ApiResult<Unit> {
            return ApiResult(
                message = message ?: "UNKNOWN EXCEPTION",
                error = true,
                payload = null
            )
        }
    }
}

