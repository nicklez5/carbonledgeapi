import {z} from "zod"

export const LoginSchema = z.object({
    email: z.string().trim().min(1,"Email is required"),
    password: z.string()
})
export const RegisterSchema = z.object({
    email: z.string().trim().min(1,"Email is required"),
    password: z.string()
})

export const MemberSchema = z.object({
    userEmail: z.string().trim().min(1,"Email is required"),
    role: z.union([z.literal("ORG_ADMIN"),z.literal("MEMBER")])
})
export const RefreshSchema = z.object({
    refreshToken: z.jwt({alg: "HS256"})
})

export const OrgSchema = z.object({
    name: z.string().trim().min(1,"Name is required"),
})

export const ReadingSchema = z.object({
    ts: z.iso.datetime(),
    quantity: z.number(),
    unit: z.union([z.literal("kWh"), z.literal("therm"), z.literal("L")]),
    source: z.union([z.literal("electricity"), z.literal("gas"), z.literal("water")])
})