package uno.mortis.lacus.core.article.entity

import com.baomidou.mybatisplus.annotation.TableName
import java.time.LocalDateTime

@TableName("article_category")
data class ArticleCategory(
    var id: Long?,
    var name: String?,
    var createTime: LocalDateTime?,
    var updateTime: LocalDateTime?,
)

