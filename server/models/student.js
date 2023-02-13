const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const StudentSchema = new Schema({
    name : {
        type : String , 
        required : true
    } , 
    email : {
        type : String , 
        required:  true
    } , 
    password : {
        type : String ,
        required : true
    } , 
    phone : {
        type : String , 
        required : false
    } ,
    courses : {
        type : [mongoose.Schema.Types.Mixed] , 
        required : false
    }
} , {timestamps : true});

const Student = mongoose.model('student' , StudentSchema);
module.exports = Student;