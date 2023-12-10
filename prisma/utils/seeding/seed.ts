import { PrismaClient } from "@prisma/client";
import { seedOrganization } from "./seedOrganization";
import aubgOrganization from "./seedingData/aubg/organization.json";
import xyzOrganization from "./seedingData/xyzuni/organization.json";
import { seedProgram } from "./seedProgram";
import aubgBusinessAdministration from "./seedingData/aubg/programs/business_administration.json";

const prisma = new PrismaClient();

await seedOrganization(prisma, aubgOrganization);
await seedOrganization(prisma, xyzOrganization);

await seedProgram(prisma, aubgBusinessAdministration, "aubg");
