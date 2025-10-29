import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required'],
    },
    name: { type: String, required: [true, 'Name is required'] },
    avatar: String,
    bookmarks: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
    },
  },
  { timestamps: true }
);

export const User = model('user', UserSchema);
