import { Request, Response, NextFunction } from "express";
import { z, ZodError, ZodTypeAny } from "zod";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken"
import authConfig from "@config/auth.config";
import Send from "@utils/response.utils";
export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid data", details: errorMessages });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  };
}
export function refreshTokenValidation(req: Request, res: Response, next : NextFunction){
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return Send.unauthorized(res, { message: "No refresh token provided"})
    }
    try{
        const decodedToken = jwt.verify(refreshToken, authConfig.refresh_secret) as {userId: number};
        (req as any).userId = decodedToken.userId;
        next();
    }catch(error){
        console.error("Refresh Token authentication failed:", error);
        return Send.unauthorized(res, { message: "Invalid or expired refresh token"});
    }
}