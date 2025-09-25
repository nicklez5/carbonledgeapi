"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getnewtoken = exports.registerUser = exports.loginUser = void 0;
const response_utils_1 = __importDefault(require("../utils/response.utils"));
const db_1 = require("../db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = __importDefault(require("../config/auth.config"));
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db_1.prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return response_utils_1.default.error(res, null, "Invalid credentials");
        }
        const passwordValid = bcryptjs_1.default.compare(password, user.password);
        if (!passwordValid) {
            return response_utils_1.default.error(res, null, "Invalid credentials");
        }
        const accessToken = jsonwebtoken_1.default.sign({ userId: user.id }, auth_config_1.default.secret, {
            expiresIn: auth_config_1.default.secret_expires_in
        });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, auth_config_1.default.refresh_secret, {
            expiresIn: auth_config_1.default.refresh_secret_expires_in
        });
        await db_1.prisma.user.update({
            where: { email: email },
            data: { refreshToken }
        });
        res.cookie("accessToken", accessToken, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict"
        });
        res.cookie("refreshToken", refreshToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict"
        });
        return response_utils_1.default.success(res, {
            refreshToken: refreshToken,
            accessToken: accessToken
        });
    }
    catch (err) {
        console.error("Login Failed:", err);
        return response_utils_1.default.error(res, null, "login failed");
    }
};
exports.loginUser = loginUser;
const registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db_1.prisma.user.findUnique({
            where: { email }
        });
        if (user) {
            return response_utils_1.default.error(res, null, "Email has already been in database");
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const createdUser = await db_1.prisma.user.create({
            data: {
                email: email,
                password: passwordHash
            }
        });
        return response_utils_1.default.success(res, {
            id: createdUser.id,
            email: createdUser.email
        });
    }
    catch (err) {
        console.error("Register failed", err);
        return response_utils_1.default.error(res, null, "registration failed");
    }
};
exports.registerUser = registerUser;
const getnewtoken = async (req, res) => {
    const userId = req.userId;
    const refreshToken = req.cookies.refreshToken;
    try {
        const user = await db_1.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user || !user.refreshToken) {
            return response_utils_1.default.unauthorized(res, "Refresh token not found");
        }
        if (user.refreshToken !== refreshToken) {
            return response_utils_1.default.unauthorized(res, "Refresh token does not match");
        }
        const newAccessToken = jsonwebtoken_1.default.sign({ userId: user.id }, auth_config_1.default.secret, { expiresIn: auth_config_1.default.secret_expires_in });
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });
        return response_utils_1.default.success(res, {
            message: "Access token refreshed successfully"
        });
    }
    catch (error) {
        console.error("Refresh token failed:", error);
        return response_utils_1.default.error(res, null, "Failed to refresh token");
    }
};
exports.getnewtoken = getnewtoken;
const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return response_utils_1.default.success(res, null, "Logged out successfully.");
    }
    catch (error) {
        console.error("Logout failed:", error);
        return response_utils_1.default.error(res, null, "Logout failed");
    }
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map