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
exports.deleteCommentService = exports.updateCommentService = exports.findCommentByUserIdAndId = exports.getAllCommentsService = exports.createCommentService = exports.findCommentByUserIdAndCompanyId = void 0;
const comments_model_1 = __importDefault(require("../models/comments.model"));
function findCommentByUserIdAndCompanyId({ author, companyId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield comments_model_1.default.findOne({ author, companyId });
    });
}
exports.findCommentByUserIdAndCompanyId = findCommentByUserIdAndCompanyId;
function findCommentByUserIdAndId({ author, commentId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield comments_model_1.default.findOne({ author, commentId });
    });
}
exports.findCommentByUserIdAndId = findCommentByUserIdAndId;
function createCommentService({ text, companyId, author, usernameAuthor, }) {
    return __awaiter(this, void 0, void 0, function* () {
        return comments_model_1.default.create({ text, companyId, author, usernameAuthor });
    });
}
exports.createCommentService = createCommentService;
function getAllCommentsService(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        return comments_model_1.default.find({ companyId });
    });
}
exports.getAllCommentsService = getAllCommentsService;
function updateCommentService({ commentId, newText, options, }) {
    return __awaiter(this, void 0, void 0, function* () {
        return comments_model_1.default.findByIdAndUpdate({ _id: commentId }, newText, options);
    });
}
exports.updateCommentService = updateCommentService;
function deleteCommentService(commentId) {
    return __awaiter(this, void 0, void 0, function* () {
        return comments_model_1.default.deleteOne({ _id: commentId });
    });
}
exports.deleteCommentService = deleteCommentService;
