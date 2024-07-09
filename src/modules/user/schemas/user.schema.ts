import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  email: String,
});
