const Article = require('../models/Article');
const User = require('../models/User');

const fs = require("fs");
const cloudinary = require("cloudinary");


function saveImageToCloudinary(path) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(path, (result) => {
            resolve(result);
        }, {
            resource_type: 'image',
            eager: [
                { effect: 'sepia' }
            ]
        })
    })
}



addArticle = (req, res, next) => {

    let { text, title, claps, description } = req.body;
    if (req.files.image) {
        saveImageToCloudinary(req.files.image.path).then((result) => {
            let obj = { text, title, claps, description, feature_img: result.url != null ? result.url : '' };

            return new Article(obj).save();
        }).then((article) => {
            return article.addAuthor(req.body.article_id)
        }).then((_article) => {
            res.status(200).send({ success: true, message: 'Article added', article: _article })
        }).catch((error) => {
            console.log('Error ');
            console.log(error);
            res.status(401).send({ success: false, message: 'Article Not Saved', error: error });
        })
    } else {
        let obj = { text, title, claps, description, feature_img: '' };

        return new Article(obj).save().then((article) => {
            return article.addAuthor(req.body.article_id)
        }).then((_article) => {
            res.status(200).send({ success: true, message: 'Article added', article: _article })
            next();
        }).catch((error) => {
            console.log('Error ');
            console.log(error);
            res.status(401).send({ success: false, message: 'Article Not Saved', error: error });
            next();
        })

    }

};

getAll = (req, res, next) => {
    Article.find(req.params.id)
        .populate('author')
        .populate('comment.author')
        .then((article) => {
            res.send({ success: true, message: 'Article found', article: article })
            next();
        })
}

clapArticle = (req, res, next) => {
    Article.findById(req.body.article_id).then((article) => {
        return article.clap().then(() => {
            res.status(200).json({ success: true, message: 'clapped' });
            next();
        }).catch((error) => {
            res.status(401).send({ success: false, message: 'Article Not Saved', error: error });
            next();
        })

    });


}

commentArticle = (req, res, next) => {
    Article.findById(req.body.article_id).then((article) => {
        return article.comment({
            author: req.body.author_id,
            text: req.body.comment
        }).then(() => {
            res.status(200).json({ success: true, message: 'clapped' });
            next();
        }).catch((error) => {
            res.status(401).json({ success: false, message: 'Error saving comment', error: error });
            next();
        })
    })
}

getArticle = (req, res, next) => {
    Article.findById(req.params.id)
        .populate('author')
        .populate('comment.author')
        .then((article) => {
            if (article) {
                res.status(200).json({ success: true, message: 'article found', article: article });
                next();
            }
        }).catch((error) => {
            res.status(401).json({ success: false, message: 'Error getting article', error: error });
            next();
        })
}

module.exports = {
    getArticle,
    commentArticle,
    clapArticle,
    addArticle,
    getAll

}