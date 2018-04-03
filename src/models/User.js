import mongoose         from 'mongoose';


const userSchema=mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  login: {type: String, unique: true},
  password: String,
  name: String,
  lastName: String,
});
export const User=mongoose.model(`User`, userSchema);