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
exports.updateCompanyService = exports.findCompanyById = exports.deleteCompanyService = exports.createCompanyService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const company_model_1 = __importDefault(require("../models/company.model"));
function createCompanyService(companyInput) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const company = yield company_model_1.default.create(companyInput);
            return company;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.createCompanyService = createCompanyService;
function findCompanyById(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const company = yield company_model_1.default.findOne({ _id: companyId });
            return company;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.findCompanyById = findCompanyById;
function deleteCompanyService(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        return company_model_1.default.deleteOne({ _id: companyId });
    });
}
exports.deleteCompanyService = deleteCompanyService;
function updateCompanyService({ companyId, newCompany, options, }) {
    return __awaiter(this, void 0, void 0, function* () {
        return company_model_1.default.findByIdAndUpdate({ _id: companyId }, newCompany, options);
    });
}
exports.updateCompanyService = updateCompanyService;
