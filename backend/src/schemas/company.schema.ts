import { object, string, array, number, TypeOf } from 'zod';

const pricingCompanySchema = object({
  plan: string({
    required_error: 'Please provide a plan pricing name',
  }).nonempty(),
  price: number({ required_error: 'Plan price' }),
});

export const companyPayload = {
  body: object({
    name: string({
      required_error: 'Please provide a company name',
    }).nonempty(),
    description: string({ required_error: 'Please provide a company name' }).nonempty(),
    location: string({ required_error: 'Please provide a company location' }).nonempty(),
    pricing: array(pricingCompanySchema, { required_error: 'Pricing must exist' }),
    category: string({ required_error: 'Pleas provide a category' }).toLowerCase(),
    phone: string({ required_error: 'Pleas provide a phone number' }),
    website: string({ required_error: 'Pleas provide a website url' }),
    imageUrl: string({ required_error: 'Pleas provide a image url' }),
  }),
};

export const params = {
  params: object({
    companyId: string({
      required_error: 'Pleas provide company id',
    }),
  }),
};

export const createCompanySchema = object({
  ...companyPayload,
});

export const updateCompanySchema = object({
  ...companyPayload,
  ...params,
});

export const deleteCompanySchema = object({
  ...params,
});
export const getSingleCompanySchema = object({
  ...params,
});

export type CreateCompanyInput = TypeOf<typeof createCompanySchema>;
export type UpdateCompanyInput = TypeOf<typeof updateCompanySchema>;
export type DeleteCompanyInput = TypeOf<typeof deleteCompanySchema>;
export type GetSingleCompanyType = TypeOf<typeof getSingleCompanySchema>;
