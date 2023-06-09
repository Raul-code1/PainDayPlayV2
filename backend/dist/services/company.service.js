"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleCompanyService = exports.getAllCompaniesService = void 0;
const company_model_1 = __importDefault(require("../models/company.model"));
function getAllCompaniesService({ category, price }) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryObject = {};
        if (category !== 'all') {
            queryObject.category = category;
        }
        return company_model_1.default.find(queryObject).sort(`${price}.price`);
    });
}
exports.getAllCompaniesService = getAllCompaniesService;
function getSingleCompanyService(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        return company_model_1.default.findOne({ _id: companyId });
    });
}
exports.getSingleCompanyService = getSingleCompanyService;
