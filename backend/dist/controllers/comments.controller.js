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
exports.deleteComment = exports.updateComment = exports.createComment = exports.getAllComments = void 0;
const http_status_codes_1 = require("http-status-codes");
const comments_services_1 = require("../services/comments.services");
const company_user_admin_services_1 = require("../services/company.user.admin.services");
const check_permissions_1 = __importDefault(require("../utils/check-permissions"));
function getAllComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { companyId } = req.params;
        const isCompanyExist = yield (0, company_user_admin_services_1.findCompanyById)(companyId);
        if (!isCompanyExist) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: `No company with id ${companyId}` });
        }
        const comments = yield (0, comments_services_1.getAllCommentsService)(companyId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ comments, count: comments.length });
    });
}
exports.getAllComments = getAllComments;
function createComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, name } = res.locals.user;
        console.log(res.locals.user);
        const { companyId, text } = req.body;
        const isCompanyExist = yield (0, company_user_admin_services_1.findCompanyById)(companyId);
        if (!isCompanyExist) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: `No company with id ${companyId}` });
        }
        const isCommentExist = yield (0, comments_services_1.findCommentByUserIdAndCompanyId)({ author: userId, companyId: companyId });
        if (isCommentExist) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: `No comment with ` });
        }
        const comment = yield (0, comments_services_1.createCommentService)({
            author: userId,
            companyId,
            text,
            usernameAuthor: name,
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({ comment });
    });
}
exports.createComment = createComment;
function updateComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, role } = res.locals.user;
        const { text } = req.body;
        const { commentId } = req.params;
        const comment = yield (0, comments_services_1.findCommentByUserIdAndId)({ author: userId, commentId });
        if (!comment) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: `No comment with id ${commentId}` });
        }
        const isUserAllowed = (0, check_permissions_1.default)({
            requestUserId: userId,
            role: role,
            resourceId: comment.author.toString(),
        });
        if (!isUserAllowed) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ msg: 'No authorized to update this comment' });
        }
        const options = {
            new: true,
        };
        const newText = {
            text,
        };
        const updatedComment = yield (0, comments_services_1.updateCommentService)({ commentId, newText, options });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ comment: updatedComment });
    });
}
exports.updateComment = updateComment;
function deleteComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { commentId } = req.params;
        const { userId, role } = res.locals.user;
        const comment = yield (0, comments_services_1.findCommentByUserIdAndId)({ author: userId, commentId });
        if (!comment) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: `No comment with id ${commentId}` });
        }
        const isUserAllowed = (0, check_permissions_1.default)({
            requestUserId: userId,
            role: role,
            resourceId: comment.author.toString(),
        });
        if (!isUserAllowed) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ msg: 'No authorized to delete this comment' });
        }
        yield (0, comments_services_1.deleteCommentService)(commentId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ comments: 'Deleted' });
    });
}
exports.deleteComment = deleteComment;
