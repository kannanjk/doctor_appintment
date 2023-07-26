const doctorModel = require('../Models/Doctor');
const appointmentModel = require('../Models/AppointmentModel');
const userModel = require('../Models/User')

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
            { userId: req.body.userId },
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

const getDoctorById = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ _id: req.body.doctorId })
        res.status(200).send({
            success: true,
            message: 'doctor list success',
            data: doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "fething err0r"
        })
    }
}

const doctorappointment = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId })
        const appointment = await appointmentModel.find({ doctorId: doctor._id })
        res.status(200).send({
            success: true,
            message: "doctor appointment fetch SuccessFully",
            data: appointment
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            message: "error found"
        })
    }
}

const updateStatus = async (req, res) => {
    try {
        const { appointmentsId, status } = req.body
        const appointments = await appointmentModel.findByIdAndUpdate(
            appointmentsId,
            { status }
        )
        const user = await userModel.findOne({ _id: appointments.userId })
       const notification= user.notification
       notification.push(
            {
                type: "status-updated",
                message: `Your appointment has been updated ${status}`,
                onClickPath: "/doctor-appointment"
            }
        )
        console.log(notification);
        await user.save()
        res.status(200).send({
            success: true,
            message: "Update Success"
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            message: "update ERROR"
        })
    }
}

module.exports = { getDoctorInfo, updateProfile, getDoctorById, doctorappointment ,updateStatus}