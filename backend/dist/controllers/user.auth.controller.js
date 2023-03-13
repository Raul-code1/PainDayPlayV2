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
exports.userLoginController = exports.userRegisterController = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_auth_service_1 = require("../services/user.auth.service");
const jwt_1 = require("../utils/jwt");
function userRegisterController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_auth_service_1.userRegisterService)(req.body);
            const token = (0, jwt_1.createJWT)({ userId: user._id, name: user.name, role: user.role });
            const userResponse = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token,
            };
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(userResponse);
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.CONFLICT).send(error.message);
        }
    });
}
exports.userRegisterController = userRegisterController;
function userLoginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, user_auth_service_1.userLoginService)(req.body);
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid password or email ' });
        }
        const token = (0, jwt_1.createJWT)({ userId: user._id, name: user.name, role: user.role });
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
        };
        return res.status(http_status_codes_1.StatusCodes.OK).json(userResponse);
    });
}
exports.userLoginController = userLoginController;
