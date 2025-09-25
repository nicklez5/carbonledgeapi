"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = require("../../middlewares/validate");
const schema_1 = require("../../schemas/schema");
const auth_controller_1 = require("../../controllers/auth.controller");
const r = (0, express_1.Router)();
r.post("/register", (0, validate_1.validateData)(schema_1.RegisterSchema), auth_controller_1.registerUser);
r.post('/login', (0, validate_1.validateData)(schema_1.LoginSchema), auth_controller_1.loginUser);
r.post('/refresh', validate_1.refreshTokenValidation, auth_controller_1.getnewtoken);
r.post('/logout', auth_controller_1.logout);
exports.default = r;
//# sourceMappingURL=auth.routes.js.map