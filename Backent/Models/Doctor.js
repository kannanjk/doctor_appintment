const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema(
    {
        userId:{
            type:String
        },
        firstName:{
            type:String,
            require:[true,"First name is required"]
        },
        lastName:{
            type:String,
            require:[true,"Last name is required"]
        },
        phone:{
            type:String,
            require:[true,"Phone number is required"]
        },
        email:{
            type:String,
            require:[true,"Email is required"]
        },
        website:{
            type:String
        },
        address:{
            type:String,
            require:[true,"Address is required"]
        },
        specialzation:{
            type:String,
            require:[true,"specialzation is required"]
        },
        exprerience:{ 
            type:String,
            require:[true,"exprerience is required"]
        },
        feesPreCunsaltaion:{
          type:Number,
          require:[true,"fees is required"]  
        },
        status:{
            type:String,
            default:'pending'
        },
        tinings:{
            type:Object,
            require:[true,'Timing required']
        }
    },{
        timestamps:true
    }
)

 const doctorModel = mongoose.model("doctors",doctorSchema)
 module.exports = doctorModel