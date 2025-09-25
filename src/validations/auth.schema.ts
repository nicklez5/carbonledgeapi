import { z } from "zod";

const login = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});
const register = z.object({
  email: z.string().trim().min(1, "Email is required"),
  password: z.string(),
});
const member = z.object({
  userEmail: z.string().trim().min(1, "Email is required"),
  role: z.union([z.literal("ORG_ADMIN"), z.literal("MEMBER")]),
});
const refresh = z.object({
  refreshToken: z.jwt({ alg: "HS256" }),
});
const org = z.object({
  name: z.string().trim().min(1, "Name is required"),
});
const reading = z.object({
  ts: z.iso.datetime(),
  quantity: z.number(),
  unit: z.union([z.literal("kWh"), z.literal("therm"), z.literal("L")]),
  source: z.union([
    z.literal("electricity"),
    z.literal("gas"),
    z.literal("water"),
  ]),
});
const authSchema = { login, register, member, refresh, org, reading  };
export default authSchema;
