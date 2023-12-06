import { type Course, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

try {
    const superProfessor = await prisma.user.upsert({
        where: { email: 'professor@admin.com' },
        update: {},
        create: {
            email: 'professor@admin.com',
            name: 'Prof. Snape',
            username: 'profsnape',
            password: 'admin1234',
            role: "Professor",
        },
    })

    if (!superProfessor) {
        throw new Error("Couldn't upsert super professor");
    }

    const promises: Promise<unknown>[] = [];

    type SeedCourse = Pick<Course, 'id' | 'name' | 'description'>

    const courseOne: SeedCourse = {
        id: "COS101",
        name: "Fundamentals in Data Structures",
        description: "Basics of data structures",
    };

    const courseTwo: SeedCourse = {
        id: "COS102",
        name: "Object Oriented Programming in Java",
        description: "Foundations in object oriented programming in Java"
    };

    [
        courseOne,
        courseTwo
    ].forEach((course: SeedCourse) => {
        promises.push(prisma.course.upsert({
            where: {
                id: course.id
            },
            update: {
                name: course.name,
                description: course.name
            },
            create: {
                id: course.id,
                name: course.name,
                description: course.description,
                createdBy: {
                    connect: { id: superProfessor.id }
                }
            },
        }))
    })

    await Promise.all(promises);

    console.log({ superProfessor })
} catch (error) {
    console.error(error)
    await prisma.$disconnect()
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
}


