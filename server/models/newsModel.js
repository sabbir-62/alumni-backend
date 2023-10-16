const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please Enter Title"]
    },
    description:{
        type: String,
        required: [true, "Please Enter Description"]
    }
},{
    timestamps: true,
    versionKey: false
})

const News = mongoose.model('news', newsSchema);
module.exports = News;