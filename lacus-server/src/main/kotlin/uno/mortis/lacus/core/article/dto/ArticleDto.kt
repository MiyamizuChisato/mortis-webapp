package uno.mortis.lacus.core.article.dto

import java.time.LocalDateTime

data class ArticleSearch(
    var id: Long?,
    var title: String?,
    var summary: String?,
    var cover: String?,
    var content: String?,
    var characters: Int?,
    var browse: Int?,
    var collected: Int?,
    var category: String?,
    var changed: Boolean?,
    var createTime: LocalDateTime?,
    var updateTime: LocalDateTime?,
    var deleted: Boolean?,
)