import { Schema, model, models } from 'mongoose';

const PropertySchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
    images: {
      type: [String],
      validate: {
        validator: (val: string[]) => val.length <= 4,
        message: () => 'Images field should not be more than 4.',
      },
    },
    is_featured: { type: Boolean, default: false },
  },

  { timestamps: true }
);

const Property = models.property || model('property', PropertySchema);

export default Property;
