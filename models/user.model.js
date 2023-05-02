const mongoose=require("mongoose");
const userschema=mongoose.Schema({
  name: String,
  email: String,
  password: String,
  dob: String,
  bio: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})
const usermodel=mongoose.model("user",userschema);
module.exports={
    usermodel
}