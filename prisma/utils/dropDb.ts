import { PrismaClient } from '@prisma/client'

process.env.DATABASE_URL="postgresql://dev:dev1234@localhost:5432/dev_db"
const prisma = new PrismaClient()

const dbName = "memorable_db"
try {
    await prisma.$executeRawUnsafe(`DROP DATABASE IF EXISTS ${dbName};`);
    console.log(`Successfully deleted "${dbName}" database!`)
} catch (e) {
    console.error(e);
}
