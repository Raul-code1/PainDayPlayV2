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
exports.userLoginService = exports.userRegisterService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const user_model_1 = __importDefault(require("../models/user.model"));
function userRegisterService(userInput) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isFirstAccount = (yield user_model_1.default.countDocuments({})) === 0;
            const role = isFirstAccount ? 'admin' : 'user';
            const user = yield user_model_1.default.create(Object.assign(Object.assign({}, userInput), { role }));
            return user;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.userRegisterService = userRegisterService;
function userLoginService(userInput) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.default.findOne({ email: userInput.email });
        if (!user)
            return false;
        const isPasswordCorrect = yield user.comparePassword(userInput.password);
        if (!isPasswordCorrect)
            return false;
        return user;
    });
}
exports.userLoginService = userLoginService;
