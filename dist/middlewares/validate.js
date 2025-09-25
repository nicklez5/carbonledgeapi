"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = validateData;
exports.refreshTokenValidation = refreshTokenValidation;
const zod_1 = require("zod");
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = __importDefault(require("../config/auth.config"));
const response_utils_1 = __importDefault(require("../utils/response.utils"));
function validateData(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.issues.map((issue) => ({
                    message: `${issue.path.join(".")} is ${issue.message}`,
                }));
                res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .json({ error: "Invalid data", details: errorMessages });
            }
            else {
                res
                    .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                    .json({ error: "Internal Server Error" });
            }
        }
    };
}
function refreshTokenValidation(req, res, next) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return response_utils_1.default.unauthorized(res, { message: "No refresh token provided" });
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(refreshToken, auth_config_1.default.refresh_secret);
        req.userId = decodedToken.userId;
        next();
    }
    catch (error) {
        console.error("Refresh Token authentication failed:", error);
        return response_utils_1.default.unauthorized(res, { message: "Invalid or expired refresh token" });
    }
}
//# sourceMappingURL=validate.js.map