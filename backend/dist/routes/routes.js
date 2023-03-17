"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_auth_controller_1 = require("../controllers/user.auth.controller");
const user_auth_schema_1 = require("../schemas/user.auth.schema");
const validate_middleware_1 = __importDefault(require("../middleware/validate-middleware"));
const company_controller_1 = require("../controllers/company.controller");
const company_user_admin_controller_1 = require("../controllers/company.user.admin.controller");
const authentication_middleware_1 = require("../middleware/authentication.middleware");
const company_schema_1 = require("../schemas/company.schema");
const comments_controller_1 = require("../controllers/comments.controller");
const comments_schema_1 = require("../schemas/comments.schema");
function routes(app) {
    app.get('/working', (req, res) => {
        res.status(200).json({ msg: 'Server Is working' });
    });
    /* //* Auth routes  */
    app.post('/api/v1/auth/register', (0, validate_middleware_1.default)(user_auth_schema_1.userRegisterSchema), user_auth_controller_1.userRegisterController);
    app.post('/api/v1/auth/login', (0, validate_middleware_1.default)(user_auth_schema_1.userLoginSchema), user_auth_controller_1.userLoginController);
    /* //* Public companies requests */
    app.get('/api/v1/companies', (0, validate_middleware_1.default)(company_schema_1.queriesForCompaniesFilterSchema), company_controller_1.getAllCompanies);
    app.get('/api/v1/company/:companyId', company_controller_1.getSingleCompany);
    /* //* Admin user  companies requests */
    app.post('/api/v1/company', [authentication_middleware_1.authenticationMiddleware, (0, authentication_middleware_1.authorizePermissions)('admin'), (0, validate_middleware_1.default)(company_schema_1.createCompanySchema)], company_user_admin_controller_1.createCompany);
    app.patch('/api/v1/company/:companyId', [authentication_middleware_1.authenticationMiddleware, (0, authentication_middleware_1.authorizePermissions)('admin'), (0, validate_middleware_1.default)(company_schema_1.updateCompanySchema)], company_user_admin_controller_1.updateCompany);
    app.delete('/api/v1/company/:companyId', [authentication_middleware_1.authenticationMiddleware, (0, authentication_middleware_1.authorizePermissions)('admin'), (0, validate_middleware_1.default)(company_schema_1.deleteCompanySchema)], company_user_admin_controller_1.deleteCompany);
    app.post('/api/v1/company/upload-image', [authentication_middleware_1.authenticationMiddleware, (0, authentication_middleware_1.authorizePermissions)('admin')], company_user_admin_controller_1.uploadImage);
    /* //*Comments requests */
    app.get('/api/v1/comments/:companyId', (0, validate_middleware_1.default)(comments_schema_1.getAllCommentsSchema), comments_controller_1.getAllComments);
    app.post('/api/v1/comment', [authentication_middleware_1.authenticationMiddleware, (0, validate_middleware_1.default)(comments_schema_1.createCommentSchema)], comments_controller_1.createComment);
    app.delete('/api/v1/comment/:commentId', [authentication_middleware_1.authenticationMiddleware, (0, validate_middleware_1.default)(comments_schema_1.deleteCommentSchema)], comments_controller_1.deleteComment);
    app.patch('/api/v1/comment/:commentId', [authentication_middleware_1.authenticationMiddleware, (0, validate_middleware_1.default)(comments_schema_1.updateCommentSchema)], comments_controller_1.updateComment);
}
exports.default = routes;
