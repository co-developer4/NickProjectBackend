const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs');

const userModel = require('../models/userModel')

exports.userLogin = async (req, res, next) => {
    const curUser = req.body;
    userModel.findOne({email:curUser.email})
        .then(async (rlt) => {
            if( rlt == null )
                return res.send({type:'error', msg:'The user is not regitered.'})
            const passwordMatch = await bcrypt.compare(curUser.password, rlt.password);
            console.log( passwordMatch )
            if( !passwordMatch )
                return res.send({type:'error', msg:'The password is wrong.'})
            const token = jwt.sign(
                {
                    email: curUser.email    
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
            )
            res.send({type:'success', msg:'Login Success', data:{info:rlt, token:token}})
        })
        .catch(err => {
            res.send(err)
        })
}

exports.userList = async (req, res, next) => {
    userModel.find({role: 'member'})
        .then(rlt => {
            res.send({type:'success', data:rlt})
        })  
        .catch(err=>{
            res.send(err)
        })  
}

exports.userDetail = (req, res, next) => {
    res.send('Not implemented: user detail')
}

exports.userCreate = async (req, res, next) => {
    console.log(req.body)
    const newUser = new userModel({
        ...req.body,
        password: await bcrypt.hash(req.body.password, 10)
    })

    userModel.create(newUser)
        .then(rlt => {
            res.send({type:'success', msg:'Created successfully.', data:rlt})
        })
        .catch(err => {
            res.send(err)
        })
}

exports.userDelete = async (req, res, next) => {
    console.log(req.params.id)
    userModel.deleteOne({_id:req.params.id})
        .then(rlt => {
            res.send({type:'success', msg:'Deleted successfully.'})
        })
        .catch(err => {
            res.send(err)
        })
}

exports.userUpdate = async (req, res, next) => {
    const updateUser = new userModel(req.body);
    console.log(updateUser)
    userModel.updateOne({_id:updateUser._id}, updateUser)
        .then(rlt => {
            res.send({type:'success', msg:'Updated successfully.'})
        })
        .catch(err => {
            res.send(err)
        })
}