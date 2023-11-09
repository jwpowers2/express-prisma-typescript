# Express.js web api with prisma ORM DEMO

## steps to run demo


## run DB using docker compose, do not start other services until DB is up

`docker compose up`

## run api and ui using dev servers
`cd api`
`npx prisma generate`
`npx prisma migrate dev`
`npx ts-node --esm main.ts`

`cd ui`
`npm run start`

* https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql

