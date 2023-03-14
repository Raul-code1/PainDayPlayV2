import { Schema, Document, model } from 'mongoose';

interface Pricing {
  plan: string;
  price: number;
}

interface PricingDocument extends Pricing, Document {}
export interface Company {
  name: string;
  description: string;
  location: string;
  category: string;
  pricing: Pricing[];
  phone: string;
  website: string;
  imageUrl: string;
}

export interface CompanyDocument extends Document, Company {
  createdAt: Date;
  updatedAt: Date;
}
const PricingSchema = new Schema<PricingDocument>({
  plan: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
});

const CompanySchema = new Schema<CompanyDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pricing: [PricingSchema],
    category: {
      type: String,
      enum: ['paintball', 'airsoft', 'laser tag'],
      default: 'paintball',
    },
    phone: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: '/uploads/default.jpg',
    },
  },
  {
    timestamps: true,
  },
);

const CompanyModel = model<CompanyDocument>('Company', CompanySchema);

export default CompanyModel;
