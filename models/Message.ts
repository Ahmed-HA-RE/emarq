import mongoose, { Schema, model, models } from 'mongoose';

const messageSchema = new Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    property: {
      type: mongoose.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    body: String,
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Message = models.Message || model('Message', messageSchema);
