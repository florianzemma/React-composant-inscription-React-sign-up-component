var express = require('express');
var router = express.Router();

var userModel = require('../models/UserSchema')
var practicienModel =  require('../models/PracticienSchema')
var mongoose = require('../models/ConnexionBDD')

var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
var uid2 = require("uid2");

    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });

    // User sign-up / Inscription de l'utilisateur 
    router.post('/inscription', async function(req,res,next){

    let salt = uid2(32);
    let newUser = null;
    let user = null ;
    
    user =  new userModel({
        name : req.body.name,
        email : req.body.email,
        password : SHA256(req.body.password + salt).toString(encBase64),
        salt:salt,
    })

    // Email format check / Vérification du format de l'email
    let emailFormat = false;   
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let emailTest = re.test(req.body.email)
    console.log(emailTest)

    if(emailTest){
    emailFormat = true;
    }else if(emailTest === false){
      emailFormat = false;
    }

    // Email check / Vérification si l'email est existant 
    emailExist = await userModel.findOne({email:req.body.email})

    if(emailExist){
    emailExist = true;
    // console.log(emailExist)
    }else{
    emailExist = false;
    // console.log(emailExist)
    }
    
    //Username Check /Vérification si l'username est existant 
    usernameExist = await userModel.findOne({name: req.body.name})
    
    if(usernameExist){
      usernameExist = true;
      // console.log(usernameExist)
    }else{
     
      usernameExist = false;
    }
    
    //Optimisation : if email exist or username and email format is incorrect you don't save   / Si l'email ou l'username existe et que le format d'email est incorrect pas de sauvegarde en BDD
    if(usernameExist === false && emailExist === true && emailFormat === false){
      newUser = null;
    }else if(usernameExist === true && emailExist === false && emailFormat === false){
      newUser = null;
    }else if(usernameExist === false && emailExist === false && emailFormat === true){
      newUser = await user.save()
    }
  
    res.json({usernameExist,emailExist,emailFormat})
    
  })
      
    //Practicien sing-up / Inscription des practiciens 
    router.post('/inscriptionpraticien', async function(req,res,next){
        
    let practicien =  new practicienModel({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      password : req.body.password
    })

    let newPraticien = await practicien.save();
    })

module.exports = router;
