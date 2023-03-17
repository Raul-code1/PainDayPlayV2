"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommentSchema = exports.deleteCommentSchema = exports.getAllCommentsSchema = exports.createCommentSchema = void 0;
const zod_1 = require("zod");
const params = {
    params: (0, zod_1.object)({
        companyId: (0, zod_1.string)({
            required_error: 'Pleas provide company id',
        }),
    }),
};
const paramsComments = {
    params: (0, zod_1.object)({
        commentId: (0, zod_1.string)({
            required_error: 'Pleas provide company id',
        }),
    }),
};
exports.createCommentSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        text: (0, zod_1.string)({ required_error: 'Please provide a comment' }).nonempty(),
        companyId: (0, zod_1.string)({ required_error: 'Please provide a company id' }).nonempty(),
    }),
});
exports.getAllCommentsSchema = (0, zod_1.object)(Object.assign({}, params));
exports.deleteCommentSchema = (0, zod_1.object)(Object.assign({}, paramsComments));
exports.updateCommentSchema = (0, zod_1.object)(Object.assign({ body: (0, zod_1.object)({
        text: (0, zod_1.string)({ required_error: 'Please provide a comment' }).nonempty(),
    }) }, paramsComments));
