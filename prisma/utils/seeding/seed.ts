import { PrismaClient } from "@prisma/client";
import { seedOrganization } from "./seedOrganization";
import aubgOrganization from "./seedingData/aubg/organization.json";
import xyzOrganization from "./seedingData/xyzuni/organization.json";

const prisma = new PrismaClient();

await seedOrganization(prisma, aubgOrganization);
await seedOrganization(prisma, xyzOrganization);
