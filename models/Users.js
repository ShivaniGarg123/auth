const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
    googleID:String,
    name:String
});
const Users=mongoose.model('users',userSchema);
module.exports=Users;