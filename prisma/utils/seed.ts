import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

try {
    const superAdmin = await prisma.user.upsert({
        where: { email: 'superadmin@admin.com' },
        update: {},
        create: {
            email: 'superadmin@admin.com',
            name: 'Super Admin',
            username: 'superadmin',
            password: 'admin1234'
        },
    })

    if (!superAdmin) {
        throw new Error("Couldn't upsert super user");
    }

    const promises: Promise<unknown>[] = [];

    [
        "Nice cuisine. Loved the atmosphere!",
        "I'm surely bringing my children here! No doubt about it!",
        "I've had better! Ravioli were blah."
    ].forEach((comment, id) => {
        promises.push(prisma.review.upsert({
            where: {
                id
            },
            update: {
                comment
            },
            create: {
                comment,
                createdBy: {
                    connect: { id: superAdmin.id }
                }
            },
        }))
    })

    await Promise.all(promises);

    console.log({ superAdmin })
} catch (error) {
    console.error(error)
    await prisma.$disconnect()
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
}


