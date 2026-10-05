package uno.mortis.lacus.core.article.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import uno.mortis.lacus.core.article.dto.ArticleSearch
import uno.mortis.lacus.core.article.entity.Article
import uno.mortis.lacus.core.article.entity.ArticleCategory
import uno.mortis.lacus.core.article.service.ArticleService

@RestController
@RequestMapping("/article")
class ArticleController(
    private val articleService: ArticleService
) {
    @GetMapping
    fun getArticle(article: ArticleSearch): List<Article>? {
        return articleService.getArticle(article)
    }

    @GetMapping("/category/all")
    fun getAllCategory(): List<ArticleCategory>? {
        return articleService.getAllCategory();
    }

    @GetMapping("/{title}")
    fun getArticleByTitle(@PathVariable("title") title: String): Article? {
        return articleService.getArticleByTitle(title)
    }

    @GetMapping("/random")
    fun getRandomArticleTitle(): String? {
        return articleService.getRandomArticleTitle()
    }
}