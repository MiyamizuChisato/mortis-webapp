package uno.mortis.lacus.core.article.mapper

import com.baomidou.mybatisplus.core.mapper.BaseMapper
import org.apache.ibatis.annotations.Mapper
import uno.mortis.lacus.core.article.entity.ArticleCategory

@Mapper
interface ArticleCategoryMapper : BaseMapper<ArticleCategory> {
}