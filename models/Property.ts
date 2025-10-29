import { Schema, model } from 'mongoose';

const PropertySchema = new Schema(
  {
    owener: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true, minLength: 4, maxLength: 150 },
    location: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
    beds: { type: Number, min: 1, max: 20, required: true },
    baths: { type: Number, min: 1, max: 20, required: true },
    square_feet: { type: Number, required: true },
    amenities: [String],
    rates: {
      nightly: Number,
      weekly: Number,
      monthly: Number,
    },
    seller_info: {
      name: String,
      email: String,
      phone: String,
    },
    images: [String],
    isFeatured: { type: Boolean, default: false },
  },

  { timestamps: true }
);

export const User = model('property', PropertySchema);
