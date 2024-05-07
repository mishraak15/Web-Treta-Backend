const mongoose = require("mongoose");

const employeeSchema={
    id:{
        type: Number,
        unique: true,
    },

    employee_name:{
       type: String,
       required: true,
    },

    employee_salary:{
       type: Number,
       required: true,
    },

    employee_age:{
       type: Number,
       required: true,
    },

    profile_image: String,
}

const Employee= mongoose.model("Employee",employeeSchema);
module.exports = Employee;