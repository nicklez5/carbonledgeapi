import express from "express";
import helmet from "helmet";
import cors from "cors"
import pino from "pino-http"
import v1 from "./routes/v1/index"
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser"
export const app = express();
app.use(helmet());
app.use(cors({origin: true}))
app.use(express.json());
app.use(pino());
app.use(cookieParser())
app.get("/health", (_req,res) => res.json({ok: true, services: "climate-api"}))
app.use("/",rateLimit({windowMs: 60_000, max:120}),v1);
//app.use("/v1",rateLimit({windowMs: 60_000, max:120}), v1);