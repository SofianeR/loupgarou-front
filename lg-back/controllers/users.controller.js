class UserController {

    login(req, res, next) {
        res.json({message: 'login'});
    }

    register(req, res, next) {
        res.json({message: 'register'});

    }
}

module.exports =   UserController