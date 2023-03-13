"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_auth_controller_1 = require("../controllers/user.auth.controller");
const user_auth_schema_1 = require("../schemas/user.auth.schema");
const validate_middleware_1 = __importDefault(require("../middleware/validate-middleware"));
function routes(app) {
    app.get('/', (req, res) => {
        res.status(200).json({ msg: 'Server Is working' });
    });
    /* Auth routes  */
    app.post('/api/v1/auth/register', (0, validate_middleware_1.default)(user_auth_schema_1.userRegisterSchema), user_auth_controller_1.userRegisterController);
    app.post('/api/v1/auth/login', (0, validate_middleware_1.default)(user_auth_schema_1.userLoginSchema), user_auth_controller_1.userLoginController);
}
exports.default = routes;
