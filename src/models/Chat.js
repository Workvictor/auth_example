import mongoose from 'mongoose';


const chatSchema=mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  messages: [
    {
      text: String,
      date: Number,
      from: mongoose.Schema.Types.ObjectId
    }
  ],
  userIds: [Number],
});
export const Chat=mongoose.model(`Chat`, chatSchema);