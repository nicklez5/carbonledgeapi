import { Router } from "express";
import {prisma} from "../../db"
import type {Request, Response} from "express"
import { refreshTokenValidation, validateData } from "@middlewares/validate";
import { LoginSchema, RegisterSchema, RefreshSchema } from "@schemas/schema";
import { loginUser, registerUser , getnewtoken, logout} from "@controllers/auth.controller";
const r = Router();
r.post("/register", validateData(RegisterSchema) , registerUser);
r.post('/login', validateData(LoginSchema),  loginUser);
r.post('/refresh', refreshTokenValidation, getnewtoken );
r.post('/logout', logout)
export default r;