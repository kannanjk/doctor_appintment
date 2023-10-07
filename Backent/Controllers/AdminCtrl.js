const doctorModel = require("../Models/Doctor");
const userModel = require("../Models/User");


const getallUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success: true,
            message: 'users data',
            data: users
        })  
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'user error' })
    }
}

const getAllDoctors = async (req,res)=>{
    try {
        const doctors = await doctorModel.find({})
        res.status(200).send({
            success:true,
            message:"doctors",
            data:doctors
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"user not found"
        })
    }
}

const changeAccountstatus = async (req,res)=>{
    try {
        const {doctorId,status}=req.body
        const doctor = await doctorModel.findByIdAndUpdate(doctorId,{status})
        const user = await userModel.findOne({_id:doctor.userId})
        const notification = user.notification
        notification.push({
            type:"doctor-account-request-updated",
            message:`your doctor account request has ${status}`,
            onClickPath:"/notification"
        })
        user.isDoctor = status === 'approved'? true :false
        await user.save()
        res.status(200).send({
            success:true,
            message:"Account status updated",
            data:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Somthing err"
        })
    }
}

module.exports = {getallUsers,getAllDoctors,changeAccountstatus}