"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userRegisterSchema = void 0;
const zod_1 = require("zod");
exports.userRegisterSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required',
        }).nonempty(),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }).min(6, 'Password to short - should be  6 characters minimum'),
        passwordConfirmation: (0, zod_1.string)({
            required_error: 'Password Confirmation is required',
        }),
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }).email('Not a valid email address'),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    }),
});
exports.userLoginSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }).email('Not a valid email address'),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }).min(6, 'Password to short - should be  6 characters minimum'),
    }),
});
