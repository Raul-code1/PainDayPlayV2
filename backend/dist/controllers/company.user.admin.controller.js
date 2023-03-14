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
exports.uploadImage = exports.updateCompany = exports.deleteCompany = exports.createCompany = void 0;
const http_status_codes_1 = require("http-status-codes");
const path_1 = __importDefault(require("path"));
const company_user_admin_services_1 = require("../services/company.user.admin.services");
/* Create company */
function createCompany(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const company = yield (0, company_user_admin_services_1.createCompanyService)(req.body);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ company });
    });
}
exports.createCompany = createCompany;
/* Delete company */
function deleteCompany(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { companyId } = req.params;
        const isCompanyExist = yield (0, company_user_admin_services_1.findCompanyById)(companyId);
        if (!isCompanyExist) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: `No company found with id ${companyId}` });
        }
        yield (0, company_user_admin_services_1.deleteCompanyService)(companyId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ companies: 'Company deleted successfully' });
    });
}
exports.deleteCompany = deleteCompany;
/* Update company */
function updateCompany(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { companyId } = req.params;
        const newCompany = req.body;
        const isCompanyExist = yield (0, company_user_admin_services_1.findCompanyById)(companyId);
        if (!isCompanyExist) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: `No company found with id ${companyId}` });
        }
        const options = { new: true };
        const company = yield (0, company_user_admin_services_1.updateCompanyService)({ companyId, newCompany, options });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ company });
    });
}
exports.updateCompany = updateCompany;
/* Upload image company */
function uploadImage(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!((_a = req.files) === null || _a === void 0 ? void 0 : _a.image)) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: 'Please choose a file' });
        }
        const imageFile = req.files.image;
        if (!imageFile || !imageFile.mimetype.startsWith('image')) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: 'Please choose a image file' });
        }
        const maxSize = 1024 * 1024;
        if (imageFile.size > maxSize) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: 'Image too heavy ' });
        }
        const imagePath = path_1.default.join(__dirname, '../../public/uploads/' + `${imageFile.name}`);
        yield imageFile.mv(imagePath);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ imageUrl: `/uploads/${imageFile.name}` });
    });
}
exports.uploadImage = uploadImage;
