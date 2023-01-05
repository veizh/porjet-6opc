const express = require("express");
const app = express();
const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce')
const path = require('path')
require("dotenv").config();
/* on se connecte a la base de donnée en utilise mongoose pour se faciliter la tache via la dépendance dotenv faire un fichier .env  || "dotenv"*/

const mongoose = require("mongoose");
mongoose
  .connect(process.env.mongoDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connexion mongo db ok !"))
  .catch(() => console.log("connexion mongo db failed ! "));

/* on utilise une dépendance cors pour eviter l'erreur d'acces Cors de manière simple et efficace */

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname,'images')));
app.use("/api/auth",userRoutes)
app.use('/api/sauces',sauceRoutes)



/*
app.get('/api/sauces',(req,res,next)=>{

    res.status(200).json({
        message: "objet recu"
    })

    const user = {
        email: document.getElementById('email'),
        password: document.getElementById('password')
    }
    res.json(201)
})
*/
module.exports = app;
