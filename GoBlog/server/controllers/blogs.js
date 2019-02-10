const BlogModel = require('../models/blog');

module.exports = {
    get : (params) => {
        return new Promise((resolve, reject) => {
            BlogModel.find(params)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    },

    post : (req) => {
        return new Promise( (resolve, reject ) =>{
            let newBlogModel = new BlogModel();
            newBlogModel.title = req.body.title;
            newBlogModel.url = req.body.url;
            newBlogModel.author = req.body.author;
            newBlogModel.save((err, insertedBlog) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(insertedBlog);
                }
            });

        });
    },

    put : (req) => {
        return new Promise((resolve, reject) => {
            BlogModel.findByIdAndUpdate(req.params.id, {
                $set: {title : req.body.title , url : req.body.url , author : req.body.author}
            }, {
                new : true
            }, (err , updatedBlog) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(updatedBlog);
                }
            })
        })
    },

    delete : (req) => {
        return new Promise((resolve,reject) => {
            BlogModel.findByIdAndRemove(req.params.id , (err,deletedBlog) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(deletedBlog);
                }
            })
        })
    }
};
