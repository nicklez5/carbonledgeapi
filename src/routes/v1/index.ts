import { Router } from "express";
import orgs from "./orgs.routes"
import auth from "./auth.routes"

const r = Router()
r.use("/orgs", orgs)
r.use("/auth",auth)
export default r;