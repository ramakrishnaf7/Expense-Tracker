const userModel = require('../models/userModel')

//login callback
const loginController = async (req,res) => {
    try{
        const {name,email,password} = req.body;
        const user = await userModel.findOne({name,email,password});
        if(!user){
            res.status(404).json({
                success:false
            })
        }
        res.status(200).json({
            success:true,
            user
        })
    }
    catch(error){
        res.status(500).json({
            success :false,
            error
    })
    }
}

//reg callback
const registerController = async (req,res) => {
    try{
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).json({
            success:false,
            newUser,
        })
    }catch(error){
        res.status(400).json({
            success:false,
            error
        })
    }
};

module.exports = {loginController,registerController};