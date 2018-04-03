import mongoose from 'mongoose';
import { User } from '../models';


const getBody=({ body })=>({
  _id: new mongoose.Types.ObjectId(),
  login: body.login,
  password: body.password,
  ...body,
});

export const createUser=({ body })=>new User(getBody({ body })).save();

export const findUserByLogin=({ login })=>User.findOne({ login }).exec();
