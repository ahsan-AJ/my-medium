const multipart = require("connect-multiparty");
const multipartware = multipart();

const articleController = require("../controllers/Article.controller");

module.exports = (router) => {

    router
        .route('/articles')
        .get(articleController.getAll);

    router
        .route('/article')
        .post(multipartware, articleController.addArticle);

    router
        .route('/article/comment')
        .post(articleController.commentArticle);

    router
        .route('/article/:id')
        .get(articleController.getArticle);

}