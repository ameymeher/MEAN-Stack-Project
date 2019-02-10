const express           = require('express');
const router            = express.Router();
const mongoose          = require('mongoose');
const db                = "mongodb://ameymeher:amey1234@ds129085.mlab.com:29085/goblogdb";
const controllers       = require('../controllers/');

mongoose.Promise        = global.Promise;       // Just to avoid any warnings from mongoose
mongoose.connect(db, (err) => {
    if(err){
        console.error("Problem connecting with the database:\n" + err);
    }
    else {
        console.log("Database connected successfully!");
    }
});

router.get('/:resource' , (req,res) => {
   const resource = req.params.resource;
   const controller  = controllers[resource];

   if(controller == null){
       res.json({
           "confirmation" : "fail",
           "message" : "Invalid Response!"
       });
   }
   else{
       controller.get()
           .then(data => {
                res.json({
                    "confirmation" : "success",
                    "message" : data
                });
           })
           .catch(err => {
                res.json({
                    "confirmation" : 'fail',
                    "message" : err.message
                })
           });
   }
});

router.get('/:resource/:id', (req, res) => {
    const resource = req.params.resource;
    const id = req.params.id;
    const controller = controllers[resource];

    if(controller == null) {
        res.json({
            "confirmation" : "fail",
            "message" : "Invalid Response!"
        });
    }
    else{
        controller.get({"_id" : id})
            .then(data => {
                res.json({
                    "confirmation" : "success",
                    "message" : data
                });
            })
            .catch(err => {
                res.json({
                    "confirmation" : 'fail',
                    "message" : err.message
                })
            });
    }
});

router.post('/:resource', (req,res) => {
    const resource = req.params.resource;
    const controller  = controllers[resource];

    if(controller == null){
        res.json({
            "confirmation" : "fail",
            "message" : "Did not got the controller!"
        });
    }
    else{
        controller.post(req)
            .then(data => {
                res.json({
                    "confirmation" : "success",
                    "message" : data
                });
            })
            .catch(err => {
                res.json({
                    "confirmation" : 'fail',
                    "message" : err
                })
            });
    }
});

router.put('/:resource/:id' ,(req,res) => {
    const resource = req.params.resource;
    const controller = controllers[resource];

    if(controller == null){
        res.json({
            "confirmation" : "fail",
            "message" : "Did not got the controller!"
        });
    }
    else{
        controller.put(req)
            .then(data => {
                res.json({
                    "confirmation" : "success",
                    "message" : data
                });
            })
            .catch(err => {
                res.json({
                    "confirmation" : 'fail',
                    "message" : err
                })
            });
    }
});

router.delete('/:resource/:id' , (req,res) =>{
    const resource = req.params.resource;
    const controller = controllers[resource];

    if(controller == null){
        res.json({
            "confirmation" : "fail",
            "message" : "Did not got the controller!"
        });
    }
    else{
        controller.delete(req)
            .then(data => {
                res.json({
                    "confirmation" : "success",
                    "message" : data
                });
            })
            .catch(err => {
                res.json({
                    "confirmation" : 'fail',
                    "message" : err
                })
            });
    }
});

module.exports = router;
