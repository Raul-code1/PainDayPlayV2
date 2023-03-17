"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queriesForCompaniesFilterSchema = exports.getSingleCompanySchema = exports.deleteCompanySchema = exports.updateCompanySchema = exports.createCompanySchema = exports.queries = exports.params = exports.companyPayload = void 0;
const zod_1 = require("zod");
const pricingCompanySchema = (0, zod_1.object)({
    plan: (0, zod_1.string)({
        required_error: 'Please provide a plan pricing name',
    }).nonempty(),
    price: (0, zod_1.number)({ required_error: 'Plan price' }),
});
exports.companyPayload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Please provide a company name',
        }).nonempty(),
        description: (0, zod_1.string)({ required_error: 'Please provide a company name' }).nonempty(),
        location: (0, zod_1.string)({ required_error: 'Please provide a company location' }).nonempty(),
        pricing: (0, zod_1.array)(pricingCompanySchema, { required_error: 'Pricing must exist' }),
        category: (0, zod_1.string)({ required_error: 'Pleas provide a category' }).toLowerCase(),
        phone: (0, zod_1.string)({ required_error: 'Pleas provide a phone number' }),
        website: (0, zod_1.string)({ required_error: 'Pleas provide a website url' }),
        imageUrl: (0, zod_1.string)({ required_error: 'Pleas provide a image url' }),
    }),
};
exports.params = {
    params: (0, zod_1.object)({
        companyId: (0, zod_1.string)({
            required_error: 'Pleas provide company id',
        }),
    }),
};
exports.queries = {
    query: (0, zod_1.object)({
        category: (0, zod_1.string)({ required_error: 'Please provide category' }).nonempty(),
        price: (0, zod_1.string)({ required_error: 'Please provide a filter price' }),
    }),
};
exports.createCompanySchema = (0, zod_1.object)(Object.assign({}, exports.companyPayload));
exports.updateCompanySchema = (0, zod_1.object)(Object.assign(Object.assign({}, exports.companyPayload), exports.params));
exports.deleteCompanySchema = (0, zod_1.object)(Object.assign({}, exports.params));
exports.getSingleCompanySchema = (0, zod_1.object)(Object.assign({}, exports.params));
exports.queriesForCompaniesFilterSchema = (0, zod_1.object)(Object.assign({}, exports.queries));
