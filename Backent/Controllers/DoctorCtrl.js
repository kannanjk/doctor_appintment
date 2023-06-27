const doctorModel = require('../Models/Doctor');

const getDoctorInfo = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            message: "doctor data fetch success",
            data: doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "data fetch fail"
        })
    }
}

const updateProfile = async (req, res) => {
    console.log(req.body);
    try {
        const doctor = await doctorModel.findOneAndUpdate(
         {userId:req.body.userId}  ,
            req.body)
        res.status(200).send({
            success: true,
            message: "profile updated success",
            data: doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Doctor profile updated issue'
        })
    }
}

const getDoctorById =async (req,res)=>{
    try {
        const doctor = await doctorModel.findOne({_id:req.body.doctorId})
        res.status(200).send({
            success:true,
            message:'doctor list success',
            data:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"fething err0r"
        })
    }
}

module.exports = { getDoctorInfo, updateProfile,getDoctorById }