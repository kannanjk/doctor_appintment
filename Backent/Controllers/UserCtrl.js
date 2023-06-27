const userModel = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const doctorModel = require('../Models/Doctor.js');

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
            return res.status(200).send({ success: true, token })
        } else {
            return res.status(200).send({ success: false })
        }
    } catch (error) {
        console.log(error);
    }
}

const authControler = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId })
        if (!user) {
            return res.status(200).send({ message: "user net found", success: false })
        } else {
            res.status(200).send({
                success: true,
                data: user
            })
        }
    } catch (error) {
        console.log("jazzz");
        console.log(error);
        res.status(200).send({ message: "Auth error", success: false })
    }
}

const applyDoctor = async (req, res) => {
    console.log(req.body);
    try {
        const newDoctor = await doctorModel({ ...req.body, status: 'pending' })
        await newDoctor.save()
        const adminUser = await userModel.findOne({ isAdmin: true })
        const notification = adminUser.notification
        notification.push({
            type: 'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} Has appied for doctor account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onclickPath: '/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, { notification })
        res.status(200).send({ success: true, message: "Doctor account applied SuccessFully" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Apply fail", error })
    }
}

const getAllNotification = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        const seenNotification = user.seenNotification
        const notification = user.notification
        seenNotification.push(...notification)
        user.notification = []
        user.seenNotification = notification
        const updatedUser = await user.save()
        res.status(200).send({
            success: true,
            message: 'All notification marked as read',
            data: updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error in notification", success: false }, error)
    }
}

const deleteAllNotification = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        user.notification = []
        user.seenNotification = []
        const updatedUser = await user.save()
        updatedUser.password = undefined
        res.status(200).send({
            success: true,
            message: 'Notification delete successFullly',
            data: updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "unable to delete" })
    }
}

const getAllDoctors = async (req,res)=>{
    try {
        const doctor = await doctorModel.find({status:"approved"})
        res.status(200).send({
            success:true,
            message:"doctor List fetching succss",
            data:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'fetching errr'
        })
    }
}

module.exports = { login, register, authControler, applyDoctor, getAllNotification,deleteAllNotification,getAllDoctors }