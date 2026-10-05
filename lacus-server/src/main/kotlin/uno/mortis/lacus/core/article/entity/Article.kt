package uno.mortis.lacus.core.article.entity

import com.baomidou.mybatisplus.annotation.TableName
import java.time.LocalDateTime

@TableName("article")
data class Article(
    var id: Long?,
    var title: String?,
    var summary: String?,
    var cover: String?,
    var content: String?,
    var characters: Int?,
    var browse: Int?,
    var collected: Int?,
    var categoryId: Long?,
    var changed: Boolean?,
    var createTime: LocalDateTime?,
    var updateTime: LocalDateTime?,
    var deleted: Boolean?,
)
