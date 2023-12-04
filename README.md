# Trackademics

## Prerequisites

- [Bun](https://bun.sh/docs/installation)
- [Docker](https://docs.docker.com/desktop/install/mac-install/)

## First time running the project

- `cp .env.example .env` to create a copy of the environment file
- copy paste missing secrets in .env file (e.g. `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`)
- `bun install` to pull the latest package changes
- `bun db:start` to start the Postgres database
- `bun db:push` to push the prisma schema to the database
- `bun db:seed` to seed the database
- `bun db:drop` to drop the database
- `bun db:studio` to easily inspect the state of the database
- `bun dev` to start development server

After seeding the database, you may login using either [this account](https://github.com/hoxhaava/memorable/blob/9e4e3284e58c587a96298322531ca4168043a58c/prisma/seed.ts#L11C1-L11C1) or Discord.

## Features

TBA

## Misc

### Drop database

Either run `bun db:drop` or follow the instructions below:

- `bun db:bash` to get into the container's shell
- `psql -U dev -d dev_db` to log into the default database
- run `DROP DATABASE IF EXISTS memorable_db;` to drop the memorable database

