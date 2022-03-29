const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {type: String,trim: true,required: true,unique: true},
    name: {type: String,required: true},
   password: {type: String,trim: true,required: true}

},{timestamps: true})


module.exports = mongoose.model('signupUser',userSchema);