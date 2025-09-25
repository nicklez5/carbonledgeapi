import { z } from "zod";
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const RegisterSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const MemberSchema: z.ZodObject<{
    userEmail: z.ZodString;
    role: z.ZodUnion<readonly [z.ZodLiteral<"ORG_ADMIN">, z.ZodLiteral<"MEMBER">]>;
}, z.core.$strip>;
export declare const RefreshSchema: z.ZodObject<{
    refreshToken: z.ZodJWT;
}, z.core.$strip>;
export declare const OrgSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export declare const ReadingSchema: z.ZodObject<{
    ts: z.ZodISODateTime;
    quantity: z.ZodNumber;
    unit: z.ZodUnion<readonly [z.ZodLiteral<"kWh">, z.ZodLiteral<"therm">, z.ZodLiteral<"L">]>;
    source: z.ZodUnion<readonly [z.ZodLiteral<"electricity">, z.ZodLiteral<"gas">, z.ZodLiteral<"water">]>;
}, z.core.$strip>;
//# sourceMappingURL=schema.d.ts.map