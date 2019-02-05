var User		= require('../models/User');



module.exports = function(router) {

    //http://localhost:8888/users
    router.post('/users',function(req,res){
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.save(function(err) {
            if (err) {
                res.send( 'Username or email already exists' );
            } else {
                res.send('User created!');
            }
        });
    });

    return router;
};