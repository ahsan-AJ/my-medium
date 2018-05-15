const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
    text: String,
    title: String,
    description: String,
    feature_img: String,
    claps: Number,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: String
    }]

});

Schema.methods.clap = function() {
    this.claps++
        return this.save();
}

Schema.methods.comment = function(c) {
    this.comments.push(c);
    return this.save();
}

Schema.methods.addAuthor = function(author_id) {
    this.author = author_id;
    return this.save();
}
Schema.methods.getUserArticle = function(_id) {
    Article.find({ 'author': _id }).then((article) => {
        return article;
    })
}

module.exports = mongoose.model('Article', Schema);