const userModel = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    console.log(req.body);
    try {
        const existUser = await userModel.findOne({ email: req.body.email })
        if (existUser) {
            return res.status(200).send({ message: "User alredy exist" })
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)
        req.body.password = hashPass
        const newUser = new userModel(req.body)
        newUser.save()
        res.status(200).send({ newUser, success: true })
    } catch (error) {
        res.status(500).send({ error })
    }
}

const login = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JSON_SECRETKEY, {
                expiresIn: "1d"
            })
            return res.status(200).send({ success: true,token })
        } else {
            return res.status(200).send({ success: false })
        }
    } catch (error) {
        console.log(error);
    }
}

const authControler = async (req,res)=>{  
    try {
        const user  = await userModel.findOne({_id:req.body.userId})
        if (!user) {
            return res.status(200).send({message:"user net found",success:false})
        }else{
            res.status(200).send({success:true,
            data:{
                name:user.name,
                email:user.email
            }})
        }
    } catch (error) {
        console.log("jazzz");
        console.log(error);
        res.status(200).send({message:"Auth error",success:false})
    }
}

module.exports = { login, register,authControler }