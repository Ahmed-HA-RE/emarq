import { Types } from 'mongoose';

type Rates = 'monthly' | 'weekly' | 'nightly';

export type PropertyCommon = {
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };

  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: Partial<Record<Rates, number>>;
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: string[];
  is_featured: boolean;
};

export type UserCommon = {
  email: string;
  name: string;
  avatar: string;
};

// Frontend type
export type PropertyFrontend = PropertyCommon & {
  _id: string;
  owner: string;
};

export type UserFrontend = UserCommon & { bookmarks: string };

// Backend type
export type PropertyBackend = PropertyCommon & {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
};

export type UserBackend = UserCommon & { bookmarks: Types.ObjectId };
