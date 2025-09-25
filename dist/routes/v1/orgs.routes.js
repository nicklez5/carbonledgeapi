"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../../db");
const r = (0, express_1.Router)();
r.get("/", async (_req, res) => {
    const rows = await db_1.prisma.organization.findMany({ orderBy: { id: "asc" } });
    res.json(rows);
});
exports.default = r;
//# sourceMappingURL=orgs.routes.js.map