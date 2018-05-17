const UserController = require('../controllers/User.controller');

module.exports = router => {

    router
        .route('/user/:id')
        .get(UserController.getUser);

    router
        .route('/user/profile/:id')
        .get(UserController.getUserProfile);

    router
        .route('/user')
        .post(UserController.addUser);

    router
        .route('/user/follow')
        .post(UserController.followUser);

}