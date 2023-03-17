"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    companyId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Company' },
    usernameAuthor: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const CommentModel = (0, mongoose_1.model)('Comment', CommentSchema);
exports.default = CommentModel;
