import {PrismaClient, Role} from '@prisma/client'
const prisma = new PrismaClient();
async function main(){
    const acme = await prisma.organization.upsert({
        where: {id: 1},
        update: {},
        create: {name: "Acme Climate Lab"}
    });
    const user = await prisma.user.upsert({
        where: {email: "admin@acme.io"},
        update: {},
        create: {email: "admin@acme.io", password: "dev-only"}
    })
    await prisma.membership.create({
        data: {role: Role.ORG_ADMIN, userId: user.id, organizationId: acme.id}
    })
    console.log("Seeded:", { org: acme, user: user.email });
}
main().finally(() => prisma.$disconnect());