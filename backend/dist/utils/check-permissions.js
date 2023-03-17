"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkPermissions({ requestUserId, role, resourceId, }) {
    if (role === 'admin')
        return true;
    if (requestUserId === resourceId)
        return true;
    return false;
}
exports.default = checkPermissions;
