"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const acme = await prisma.organization.upsert({
        where: { id: 1 },
        update: {},
        create: { name: "Acme Climate Lab" }
    });
    const user = await prisma.user.upsert({
        where: { email: "admin@acme.io" },
        update: {},
        create: { email: "admin@acme.io", password: "dev-only" }
    });
    await prisma.membership.create({
        data: { role: client_1.Role.ORG_ADMIN, userId: user.id, organizationId: acme.id }
    });
    console.log("Seeded:", { org: acme, user: user.email });
}
main().finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map