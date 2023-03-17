export interface Company {
  _id: string;
  name: string;
  description: string;
  location: string;
  pricing: Pricing[];
  category: string;
  phone: string;
  website: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Pricing {
  plan: string;
  price: number;
  _id: string;
}

export interface CompaniesResponse {
  companies: Company[];
  count: number;
}
export interface SingleCompanyResponse {
  company: Company;
}

/* App state */
