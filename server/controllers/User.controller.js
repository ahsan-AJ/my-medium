const User = require('../models/User');
const Article = require('../models/Article');


let addUser = (req, res, next) => {
    return new User(req.body).save().then((newUser) => {
        if (newUser) {
            res.status(200).send({ success: true, message: 'User saved', user: newUser })
            next();
        }
    }).catch((error) => {
        res.status(401).send({ success: false, message: 'error saving new user', error: error })
        next();
    })
}

let getUser = (req, res, next) => {
    User.findById(req.params.id)
        .populate('followers')
        .populate('following')
        .then((user) => {
            if (user) {
                res.status(200).send({ success: true, message: 'user found', user: user })
                next();
            } else {
                res.status(404).send({ success: false, message: 'user not found' });
                next()
            }
        }).catch((error) => {
            res.status(401).send({ success: false, message: 'user not found', error: error });
            next()
        })
}

let followUser = (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            return user.follow(req.body.follow_id);
        }).then(() => {
            res.status(200).send({ success: true, message: 'user followed' });
            next();
        }).catch((error) => {
            res.status(401).send({ success: false, message: 'error following user' })
            next();
        })
}

let getUserProfile = (req, res, next) => {
    User.findById(req.params.id).then((user) => {

        // get those users whose following list has the current user id
        return user.find({ "following": req.params.id })
            .then((_users) => {
                _users.forEach((_user) => {
                    user.addFollower(_user)
                })
            })

    }).then((user) => {
        Article.find({ 'author': req.parms.id }).then((_articles) => {
            return res.status(200).send({ success: true, message: 'user details got', data: { user: user, articles: _articles } });
        })
    }).catch((error) => {
        res.status(401).send({ success: false, message: 'error getting user', error: error })
    })
}








module.exports = {
    addUser,
    getUserProfile,
    followUser,
    getUser
}