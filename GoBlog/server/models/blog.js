const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

const blogSchema        = new Schema({
    title : String,
    url : String,
    author : String
});

module.exports = mongoose.model('blogModel',blogSchema,'blogs');

