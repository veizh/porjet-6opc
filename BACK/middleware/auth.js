const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.generateAccessToken = (id) => {
    
    return jwt.sign({id:id},process.env.accessTokenSecret,{expiresIn:'1800s'});

}


exports.authToken = (req,res,next) => {
    const authHeader = req.headers['autorization']
    const token =authHeader && authHeader.split('')[1]
    if(!token){
        return next()
    }
    jwt.verify(process.env.accessTokenSecret,(err,user)=> {
        if(err){res.statuts(404)}

    })
    req.user = user
}