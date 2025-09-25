"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const pino_http_1 = __importDefault(require("pino-http"));
const index_1 = __importDefault(require("./routes/v1/index"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.app = (0, express_1.default)();
exports.app.use((0, helmet_1.default)());
exports.app.use((0, cors_1.default)({ origin: true }));
exports.app.use(express_1.default.json());
exports.app.use((0, pino_http_1.default)());
exports.app.get("/health", (_req, res) => res.json({ ok: true, services: "climate-api" }));
exports.app.use("/", (0, express_rate_limit_1.default)({ windowMs: 60_000, max: 120 }), index_1.default);
//app.use("/v1",rateLimit({windowMs: 60_000, max:120}), v1);
//# sourceMappingURL=app.js.map