const bcrypt = require("bcrypt");
const User = require("../models/user.js")
const jwt = require('jsonwebtoken')
require('dotenv').config()
exports.signup = (req, res, next) =>{
  /*  console.log(req.body);
    console.log(req.body.password)*/

  bcrypt.hash(req.body.password, 10).then((hash) => {
    const newUser = new User({ ...req.body, password: hash });
    newUser.save().then((res) => console.log(res));
  });
  /*  .catch(error => console.log(error))*/

  return res.status(201).json({ message: "objet crée",});

   
}

exports.login = (req, res) =>{
    User.findOne({ email: req.body.email })
        .then((user) => {
        console.log("je suis l'user trouvé " + user);
        if (!user) return res.status(400).json({msg:"le mail ne correspond a aucun de notre bdd"})
          
        
        bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
        if (!valid === true) res.status(400).json({msg:"le mot de passe est inccorect"})
           
        
        return res.status(200).json({ userId: user._id,token: jwt.sign({ userId: user._id },process.env.accessTokenSecret,{ expiresIn: '24h' })})
         })   
        })        
        }
