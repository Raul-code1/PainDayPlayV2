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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleCompany = exports.getAllCompanies = void 0;
const http_status_codes_1 = require("http-status-codes");
const company_service_1 = require("../services/company.service");
/* Get all companies */
function getAllCompanies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { category, price } = req.query;
        const companies = yield (0, company_service_1.getAllCompaniesService)({ category, price });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ companies, count: companies.length });
    });
}
exports.getAllCompanies = getAllCompanies;
/* Get single company */
function getSingleCompany(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { companyId } = req.params;
        const company = yield (0, company_service_1.getSingleCompanyService)(companyId);
        if (!company) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: `No company with id ${companyId}` });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ company });
    });
}
exports.getSingleCompany = getSingleCompany;
