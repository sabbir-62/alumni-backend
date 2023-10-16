const News = require('../models/newsModel')

exports.createNews = async(req, res) => {
    const {title, description} = req.body;

    try{
        if(!title || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const news = await News.create({
            title, description
        })

        if(!news){
            return res.status(400).json({
                success: false,
                message: "Data save is failed"
            })
        }
        else{
            return res.status(200).json({
                data: news,
                success: true,
                message: "Data save successfully"
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}




exports.getNews = async(req, res) => {
    try{
        const news = await News.find()
        if(news){
            return res.status(200).json({
                success: true,
                message: "success",
                news: news
            })
        }
        else{
            return res.status(404).json({
                success: false,
                message: "Nothing"
            })
        }
    }
    catch (err) {
        return res.status(404).json({
            success: false,
            message: 'Please login'
        });
    }
}