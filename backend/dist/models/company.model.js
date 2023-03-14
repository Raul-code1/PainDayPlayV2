"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PricingSchema = new mongoose_1.Schema({
    plan: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
});
const CompanySchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
const CompanyModel = (0, mongoose_1.model)('Company', CompanySchema);
exports.default = CompanyModel;
