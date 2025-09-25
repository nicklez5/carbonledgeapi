import { z } from "zod";
declare const authSchema: {
    login: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, z.core.$strip>;
    register: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, z.core.$strip>;
    member: z.ZodObject<{
        userEmail: z.ZodString;
        role: z.ZodUnion<readonly [z.ZodLiteral<"ORG_ADMIN">, z.ZodLiteral<"MEMBER">]>;
    }, z.core.$strip>;
    refresh: z.ZodObject<{
        refreshToken: z.ZodJWT;
    }, z.core.$strip>;
    org: z.ZodObject<{
        name: z.ZodString;
    }, z.core.$strip>;
    reading: z.ZodObject<{
        ts: z.ZodISODateTime;
        quantity: z.ZodNumber;
        unit: z.ZodUnion<readonly [z.ZodLiteral<"kWh">, z.ZodLiteral<"therm">, z.ZodLiteral<"L">]>;
        source: z.ZodUnion<readonly [z.ZodLiteral<"electricity">, z.ZodLiteral<"gas">, z.ZodLiteral<"water">]>;
    }, z.core.$strip>;
};
export default authSchema;
//# sourceMappingURL=auth.schema.d.ts.map