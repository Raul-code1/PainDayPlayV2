"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizePermissions = exports.authenticationMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("../utils/jwt");
function authenticationMiddleware(req, res, next) {
    const headerAuthorization = req.headers.authorization;
    if (!headerAuthorization || !headerAuthorization.startsWith('Bearer ')) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ msg: 'Unauthorized' });
    }
    const token = headerAuthorization === null || headerAuthorization === void 0 ? void 0 : headerAuthorization.split(' ')[1];
    const { payload, valid } = (0, jwt_1.verifyJWT)(token);
    if (valid && payload) {
        res.locals.user = payload;
        return next();
    }
    else if (!payload && !valid) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ msg: 'Authentication invalid' });
    }
}
exports.authenticationMiddleware = authenticationMiddleware;
function authorizePermissions(...roles) {
    return (req, res, next) => {
        if (!roles.includes(res.locals.user.role)) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ msg: 'Unauthorized to access this route' });
        }
        return next();
    };
}
exports.authorizePermissions = authorizePermissions;
