"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingSchema = exports.OrgSchema = exports.RefreshSchema = exports.MemberSchema = exports.RegisterSchema = exports.LoginSchema = void 0;
const zod_1 = require("zod");
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().trim().min(1, "Email is required"),
    password: zod_1.z.string()
});
exports.RegisterSchema = zod_1.z.object({
    email: zod_1.z.string().trim().min(1, "Email is required"),
    password: zod_1.z.string()
});
exports.MemberSchema = zod_1.z.object({
    userEmail: zod_1.z.string().trim().min(1, "Email is required"),
    role: zod_1.z.union([zod_1.z.literal("ORG_ADMIN"), zod_1.z.literal("MEMBER")])
});
exports.RefreshSchema = zod_1.z.object({
    refreshToken: zod_1.z.jwt({ alg: "HS256" })
});
exports.OrgSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1, "Name is required"),
});
exports.ReadingSchema = zod_1.z.object({
    ts: zod_1.z.iso.datetime(),
    quantity: zod_1.z.number(),
    unit: zod_1.z.union([zod_1.z.literal("kWh"), zod_1.z.literal("therm"), zod_1.z.literal("L")]),
    source: zod_1.z.union([zod_1.z.literal("electricity"), zod_1.z.literal("gas"), zod_1.z.literal("water")])
});
//# sourceMappingURL=schema.js.map