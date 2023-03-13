"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || 'secretDevKey';
const expiresInd = process.env.JWT_EXPIRE;
function createJWT(payload) {
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expiresInd });
}
exports.createJWT = createJWT;
