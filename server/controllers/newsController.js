const News = require('../models/newsModel')


/*----------Create News----------*/
exports.createNews = async(req, res) => {
    const {title, description, email} = req.body;

    try{
        if(!title || !description || !email){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const news = await News.create({
            title, description, email
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




/*----------Find all news and sent to font-end----------*/
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


/*----------Find my posts----------*/
exports.myPost = async(req, res) => {
    const {email} = req.body;
    try{
        const news = await News.find({email})
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


/*----------Delete News----------*/
exports.deleteNews = async(req, res) => {
    const title = req.body.title;
    try{
        const news = await News.findOne({title})

        const result = await News.deleteOne(news)

        if(result){
            return res.status(200).json({
                success: true,
                message: "Delete Success",
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