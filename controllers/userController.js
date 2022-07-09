const User = require('../models/User')
const mongoose = require('mongoose')
const Beneficiary = require('../models/Beneficiary')

const jwt = require('jsonwebtoken')
const {encrypt, decrypt} = require('../middllwars/crypte')

exports.checkThisEmailIfExist = (req, res, next) => {
    User.find({email: req.body.email}, (err, data) => {
        if(err || !data || data.length >= 1)
            return res.status('400').json({error: "cette email déjà exist"})
        next() 
    })
}

exports.signup = (req, res) => {
    try {
        if(req.body.confirmPass !== req.body.password || !req.body.confirmPass) {
            return res.status('400').json({error: "Les mots de passe saisis ne sont pas identiques. "})
        }

        const user = new User(req.body)

        user.save((err, user) => {
            if(err) {
                return res.status('400').json({error: err})
            }

            res.send(user)
        })
    }
    catch(error) {

    }
}

exports.signin = (req, res) => {
    try {
        const {email, password} = req.body

        User.findOne({email}, (err, user) => {
            if(err || !user) {
                return res.status(400).json({error: "Ce compte n'existe pas ! Veuillez-vous inscrire"})
            }
            if(decrypt(user.password) != password) {
                return res.status(401).json({error: 'Veuillez entrer un mot de passe correct'})
            }

            // expire after 1 hours exp: Math.floor(Date.now() / 1000) + (60 * 60)
            const token = jwt.sign({_id: user._id, role: user.role, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, process.env.JWT_SECRET, { algorithm: 'HS256' }); 
    
            res.cookie('token', token, { expire: new Date() + (60*24*3600000) })

            const {_id, name, email, role, phone, Point_Fidilite} = user;

            // return res.json({
            //     token, user: {_id, name, email, role}
            // })
            return res.json({ token, _id, name, email, phone, Point_Fidilite, role })
        })
    }
    catch(error) {

    }
}

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(404).json({
                error: "Ce compte n'existe pas ! Veuillez-vous inscrire"
            })
        }

        req.profile = user;
        next();
    })
}

exports.getOneUser = (req, res) => {
    res.json({
        user: req.profile._id
    })
}

exports.SignOut = (req, res) =>  {
    res.clearCookie('token');

    res.json({
        message: "Vous êtes déconnecté"
    })
}

exports.updateUserPassword = (req, res) => {
    if(req.body.Password != req.body.RPassword) {
        return res.status(400).json({error: "Les mots de passe saisis ne sont pas identiques"})
    }

    if(req.body.Password == "" || req.body.RPassword == "")
        return res.status(400).json({error: "Entrer votre mot de pass"})

    var userPasswordObject = {
        password: encrypt(req.body.Password),
    }

    User.findOneAndUpdate({_id: req.params.UserID}, userPasswordObject, (err, user) => {
        if(req.body.oldPassword != decrypt(user.password))
            return res.status(400).json({error: "Le mot de passe actuel saisi est incorrect"})
        if(err)
            return res.status(400).json({error: "server error"})

        res.json("le mot de pass a été modifiée")
    })
}

 // -----Transfer de Points----- 
 exports.TransferPoints = async (req, res) => {

    const option = {new : true}
    const idTO = req.params.userIdTo
    const idFROM = req.params.userIdFrom

    const userFrom = await User.findById(idFROM);
    
    User.findById(idTO).exec( async(err, user) => {
        if(err || !user) {
            return res.status(404).json("Cet utilisateur n'existe pas")
        }
        if(userFrom.Point_Fidilite < req.body.point){
            return res.status(404).json("Le nombre de points que vous avez n'est pas suffisant")
        }
    
        const result = await User.findByIdAndUpdate( idTO,
             {
                Point_Fidilite: user.Point_Fidilite  + Number(req.body.point)
             }, 
             option)
        

        if(result){
            
            const dataUserFrom = await User.findByIdAndUpdate( idFROM,
                {
                  Point_Fidilite: userFrom.Point_Fidilite - Number(req.body.point)
                }, 
                option
            )

            res.status(200).json(result)
        }
        else{
            res.send('error')
        }
       
    })
}

// Add Beneficiary
  exports.AddBeneficiary = async(req, res)=>{

    try{

    const  id = req.params.userId

    User.findById(id).exec( async(err, user) => {
        if(err || !user) {
            return res.status(404).json("Cet utilisateur n'existe pas")
        }
        
            const newBeneficairy = new Beneficiary(req.body)

            newBeneficairy.save((err, result)=>{

            if(err) {
                res.status(400).json(err)
            }
            res.status(200).json(" SUCCESS ")

            })

    })

    }

    catch(error){
        
    }
}

exports.getBeneficiaryByUserId = (req, res) => {
    const id = req.params.userId;

    Beneficiary.find({userId: id}).exec((err, beneficiary) => {
        if(err || !beneficiary) {
            return res.status(404).json( "ACCUN RESULT" )
        }

        res.status(200).json(beneficiary)
       
    })
};

exports.addRequest = async (req, res) => {

    // exports.sendFriendRequest = async (data) => {

    const data = req.body
    // res.send(data.myName)
        try{   
            // await mongoose.connect();
    
            await User.updateOne({_id: data.friendId}, 
                { 
                    $push : {friendRequest : {name: data.myName, id: data.myId}}
                }
            );
            await User.updateOne({_id: data.myId}, 
                { 
                    $push : {friendRequest : {name: data.friendName, id: data.friendId}}
                }
            );
            // mongoose.disconnect();
            return res.status(200).json("nadiii canaaadi");
        }
        catch(error){
            // mongoose.disconnect();
            console.log(error);
        }
          
    // }

    // User.sendFriendRequest(req.body)
    // .then(response =>{
    //     res.send('nadi canadi')
    // })
    // .catch(err=>{
    //     console.log(err)
    // })

}



