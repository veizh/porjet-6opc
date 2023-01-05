
const { find, updateOne } = require('../models/Sauce');
const Sauce = require('../models/Sauce')


exports.createSauce =(req, res ) => {
    const sauceObject = JSON.parse(req.body.sauce)
    const newSauce =new Sauce ({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    console.log(req.newSauce);
    newSauce.save()
        .then(()=>{res.status(201).json({msg:"enregistré"})})
        .catch((error)=>res.status(400).json({error}))
}
exports.getAllSauces=   (req,res) =>{
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(err => res.status(400).json({ err }));
}
exports.getOneSauce = (req,res) =>{
    const test = Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(err => res.status(400).json({ err }))
}
exports.deleteSauce = (req,res) => {
    Sauce.deleteOne({_id: req.params.id})
        .then(res => res.status(203).json(res))
        .catch(err => res.status(400).json({ err }))
}
exports.modifySauce = (req,res) => {
    console.log(req.file);
    const sauce = req.body
    let tmp
    if(req.file){
         tmp ={ 
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            ...sauce
            
        }

    }
    else{
         tmp ={ 
            ...sauce
            
        }
    }
    console.log(tmp);
    Sauce.updateOne({_id:req.params.id},{$set:tmp})
        .then(resultat => res.status(200).json({msg:resultat}))
        .catch(err => res.status(400).json({"message": "String"}))

}
exports.like = (req,res) =>{
    const id = req.body.userId
    Sauce.findOne( {_id:req.params.id})
    .then((sauce) => { 

        
        let newLikes = sauce.likes
        let newDislikes = sauce.dislikes
        if(req.body.like === 1 ){ 
            newLikes = newLikes+1
            sauce.usersLiked.push(id)
            console.log("likes + le nouveau=> " + newLikes);
             return Sauce.updateOne({ _id:req.params.id},{$set:{usersLiked:sauce.usersLiked,likes:newLikes} })
        }
        if(req.body.like === -1 ){ 
            newDislikes = newDislikes + 1
            sauce.usersDisliked.push(id)
            console.log("dislikes + le nouveau => " + newDislikes);
             return Sauce.updateOne({ _id:req.params.id},{$set:{usersDisliked:sauce.usersDisliked,dislikes:newDislikes} })
        }
        if(req.body.like === 0 ){
            // si like =0 on doit retirer l'user des deux tableaux like/dislike
    
            if(sauce.usersLiked.find(e=> e === req.body.userId)){
                let newArrayLiked = sauce.usersLiked.filter(e=> {e !== req.body.userId})
                console.log(newArrayLiked);
                newLikes = newLikes -1
                
                return Sauce.updateOne({ _id:req.params.id},{$set:{usersLiked:newArrayLiked , likes:newLikes} })
                
             }
             if(sauce.usersDisliked.find(e=> e === req.body.userId)){
                let newArrayDisliked = sauce.usersDisliked.filter(e=> {e !== req.body.userId})
                console.log(newArrayDisliked);
                newDislikes = newDislikes - 1
                console.log(newDislikes);
                return Sauce.updateOne({ _id:req.params.id},{$set:{usersDisliked:newArrayDisliked , dislikes:newDislikes} })
                
             }
             
            }
        })
    .then(test => res.status(200).json({msg:"ok"}))
    }
