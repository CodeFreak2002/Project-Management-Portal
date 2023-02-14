const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const TeacherSchema = new Schema({
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

const Teacher = mongoose.model('teacher' , TeacherSchema);
module.exports = Teacher;