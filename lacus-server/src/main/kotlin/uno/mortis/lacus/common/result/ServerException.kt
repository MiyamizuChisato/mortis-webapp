package uno.mortis.lacus.common.result

class ServerException(
    override val message: String
) : RuntimeException()