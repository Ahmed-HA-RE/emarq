import { Schema, model } from 'mongoose';
import { UserBackend } from 'type';

const UserSchema = new Schema<UserBackend>(
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

export const User = model<UserBackend>('user', UserSchema);
