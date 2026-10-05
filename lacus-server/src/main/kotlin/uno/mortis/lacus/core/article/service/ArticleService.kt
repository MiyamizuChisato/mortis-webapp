package uno.mortis.lacus.core.article.service

import com.baomidou.mybatisplus.core.toolkit.Wrappers
import org.springframework.stereotype.Service
import uno.mortis.lacus.core.article.dto.ArticleSearch
import uno.mortis.lacus.core.article.entity.Article
import uno.mortis.lacus.core.article.entity.ArticleCategory
import uno.mortis.lacus.core.article.mapper.ArticleCategoryMapper
import uno.mortis.lacus.core.article.mapper.ArticleMapper

@Service
class ArticleService(
    private val articleMapper: ArticleMapper,
    private val articleCategoryMapper: ArticleCategoryMapper,
) {
    fun getAllCategory(): List<ArticleCategory>? {
        return articleCategoryMapper.selectList(null)
    }

    fun getCategoryByName(name: String): ArticleCategory? {
        val wrapper = Wrappers.lambdaQuery<ArticleCategory>()
        wrapper.eq(ArticleCategory::name, name)
        return articleCategoryMapper.selectOne(wrapper)
    }

    fun getArticleByTitle(title: String): Article? {
        val wrapper = Wrappers.lambdaQuery<Article>()
        wrapper.eq(Article::title, title)
        return articleMapper.selectOne(wrapper)
    }

    fun getRandomArticleTitle(): String? {
        return articleMapper.getRandomArticleTitle()
    }

    fun getArticle(article: ArticleSearch): List<Article>? {
        val wrapper = Wrappers.lambdaQuery<Article>()
        wrapper.eq(article.title != null, Article::title, article.title)
        wrapper.like(article.content != null, Article::content, article.content)
        article.category?.let {
            val category = getCategoryByName(it)
            wrapper.eq(category?.id != null, Article::categoryId, category?.id)
        }
        return articleMapper.selectList(wrapper)
    }

}