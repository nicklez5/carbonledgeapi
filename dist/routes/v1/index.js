"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orgs_routes_1 = __importDefault(require("./orgs.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const r = (0, express_1.Router)();
r.use("/orgs", orgs_routes_1.default);
r.use("/auth", auth_routes_1.default);
exports.default = r;
//# sourceMappingURL=index.js.map