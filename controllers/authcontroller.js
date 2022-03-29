const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const urlmodel = require('../models/urls')
const registermodel = require("../models/signup");




exports.registerController = (req,res) => {
    const {name,email,password} = req.body;

    registermodel.findOne({email},(err,user) => {
        if(user) { 
            return res.status(500).send({
                error: "Email is already taken"
            })
        }
    })

   // Hashing password

   bcrypt.hash(password,10,(err,hashPassword) => {
       
    const newUser = new registermodel({
        name,
        email,
        password: hashPassword
    })
    newUser.save((err,user) => {
        if(err || user===null) {
            return res.status(500).send({error: 'Database error'})
        }
        else{
            return res.status(200).send({
                success: true,
                message: "signup successfully"
            })
        }
    }) 


   }) 


}


exports.loginrController = (req,res) => {

    const {email,password} = req.body;
   
    registermodel.findOne({email},(err,data) => {
        if(err || data === null) {
            res.json({error: 'user does not exist'})
        } 
        else{
            bcrypt.compare(password,data.password,(err,result) => {
                if(!result) {
                    res.json({error: "Incorrect Password"})
                }
                else{
                    return res.json({
                        name: data.name,
                        email: data.email,
                        suceess: true
                    })
                }
            })
        }
    })


}




exports.insertController = (req,res) => {

    const {email,full} = req.body;
    const newUrl = new urlmodel({
        email,
        full
    })
    newUrl.save((err,data) =>{
        if(err) {
             res.json({error: "database error"})
    }
    else{
        res.json({success: true,message: "inserted successfully",link: data.short})
    }
    })

}


exports.editController = (req,res) => {

    const {email,short,newshort} = req.body;
    
    urlmodel.findOne({short: newshort},(err,data) => {
    
        if(data) {
            return res.json({success: false,error: "Already Exist.. \n Try Diffrent text."})
        }
        else{
            urlmodel.findOne({email,short},(err,result) => {
                if(result) {
                    
            result.short = newshort;
            result.save();
            return res.json({success: true,message: "Updated successfully!"})
                }
                else{
                    
            return res.status(500).json({success: false,error: "Database Error"})
                }

            })

        }
    })
    


}




exports.getController = (req,res) => {

    const {email} = req.body;
    urlmodel.find({email},(err,data) =>{
        if(err){
            res.json({error: "Database error"})
        }
        else{
            res.json({urls: data,success:true})
        }
    })


}


exports.clickController = (req,res) => {

    const {short} = req.body;
    console.log(short)
    urlmodel.findOne({short},(err,data) =>{
        if(err){
            res.json({error: "Database error"})
        }
        else{
            urlmodel.updateOne({short},{clicks: data.clicks+1},(err,data)=>{
                if(err) {
                    res.json({error: "database update error"})
                }
                else{
                    res.json({success: true})
                }
            })
        }
    })


}