import { Router } from "express";
import {prisma} from "../../db"
import type {Request, Response} from "express"
const r = Router();
r.get("/", async(_req:Request, res:Response) => {
    const rows = await prisma.organization.findMany({orderBy: {id: "asc"}})
    res.json(rows);
})
export default r;