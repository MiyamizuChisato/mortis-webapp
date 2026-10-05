package uno.mortis.lacus.core.article.mapper

import com.baomidou.mybatisplus.core.mapper.BaseMapper
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Select
import uno.mortis.lacus.core.article.entity.Article

@Mapper
interface ArticleMapper : BaseMapper<Article> {
    @Select(
        """
            SELECT title from article order by random() limit 1
        """
    )
    fun getRandomArticleTitle(): String?
}