"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const http_status_codes_1 = require("http-status-codes");
function validateFields(schema) {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(error.issues);
            }
        }
    };
}
exports.default = validateFields;
