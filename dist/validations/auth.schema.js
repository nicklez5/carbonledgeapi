"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const login = zod_1.z.object({
    email: zod_1.z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Invalid email format"),
    password: zod_1.z.string().min(1, "Password is required"),
});
const register = zod_1.z.object({
    email: zod_1.z.string().trim().min(1, "Email is required"),
    password: zod_1.z.string(),
});
const member = zod_1.z.object({
    userEmail: zod_1.z.string().trim().min(1, "Email is required"),
    role: zod_1.z.union([zod_1.z.literal("ORG_ADMIN"), zod_1.z.literal("MEMBER")]),
});
const refresh = zod_1.z.object({
    refreshToken: zod_1.z.jwt({ alg: "HS256" }),
});
const org = zod_1.z.object({
    name: zod_1.z.string().trim().min(1, "Name is required"),
});
const reading = zod_1.z.object({
    ts: zod_1.z.iso.datetime(),
    quantity: zod_1.z.number(),
    unit: zod_1.z.union([zod_1.z.literal("kWh"), zod_1.z.literal("therm"), zod_1.z.literal("L")]),
    source: zod_1.z.union([
        zod_1.z.literal("electricity"),
        zod_1.z.literal("gas"),
        zod_1.z.literal("water"),
    ]),
});
const authSchema = { login, register, member, refresh, org, reading };
exports.default = authSchema;
//# sourceMappingURL=auth.schema.js.map