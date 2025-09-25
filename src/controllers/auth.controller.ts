import {Request, Response} from "express";
import Send from "@utils/response.utils"
import { prisma } from "../db";
import authSchema from "validations/auth.schema";
import bcrypt, { genSalt } from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import authConfig from "@config/auth.config";

//Authenticating
//Implemented RBAC 
export const loginUser = async (req: Request, res:Response) =>{
    const {email, password} = req.body as z.infer<typeof authSchema.login>
    try{
        const user = await prisma.user.findUnique({
            where: {email}
        });
        if(!user){
            return Send.error(res,null, "Invalid credentials")
        }
        const passwordValid = bcrypt.compare(password, user.password);
        if(!passwordValid){
            return Send.error(res, null, "Invalid credentials");
        }

        const accessToken = jwt.sign({userId: user.id}, authConfig.secret , {
            expiresIn: authConfig.secret_expires_in as any
        })
        const refreshToken = jwt.sign({userId: user.id}, authConfig.refresh_secret, {
            expiresIn: authConfig.refresh_secret_expires_in as any
        })
        await prisma.user.update({
            where: {email: email},
            data: {refreshToken}
        })
        res.cookie("accessToken", accessToken, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict"
        })
        res.cookie("refreshToken", refreshToken, {
            maxAge: 24*60*60*1000,
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            path: "/auth/refresh"
        })
        return Send.success(res, {
            refreshToken: refreshToken,
            accessToken: accessToken
        })
    }catch(err){
        console.error("Login Failed:", err);
        return Send.error(res, null, "login failed");
    }

}

export const registerUser = async(req: Request, res:Response) => {
    const { email, password } = req.body as z.infer<typeof authSchema.register>;
    try{
        const user = await prisma.user.findUnique({
            where: {email}
        })
        if(user){
            return Send.error(res,null,"Email has already been in database");
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const createdUser = await prisma.user.create({
            data: {
                email: email,
                password: passwordHash
            }
        });
        return Send.success(res,{
            id: createdUser.id,
            email: createdUser.email
        })
    }catch(err){
        console.error("Register failed", err);
        return Send.error(res, null, "registration failed");
    }
}

export const getnewtoken = async(req:Request, res: Response) => {
    
    try{
        const userId = (req as any).userId;
        const refreshToken = req.cookies.refreshToken;
        const user = await prisma.user.findUnique({
            where: {id : userId}
        })
        if(!user || !user.refreshToken){
            return Send.unauthorized(res, "Refresh token not found");
        }
        if(user.refreshToken !== refreshToken){
            return Send.unauthorized(res, "Refresh token does not match")
        }
        const newAccessToken = jwt.sign(
            { userId: user.id},
            authConfig.secret,
            { expiresIn: authConfig.secret_expires_in as any}
        );
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });
        return Send.success(res, {
            message: "Access token refreshed successfully"
        });
    }catch(error){
        console.error("Refresh token failed:", error)
        return Send.error(res, null, "Failed to refresh token");
    }
}
export const logout = async(req: Request, res: Response) => {
    try{
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return Send.success(res, null, "Logged out successfully.")
    }catch(error){
        console.error("Logout failed:",error);
        return Send.error(res, null, "Logout failed")
    }
}
