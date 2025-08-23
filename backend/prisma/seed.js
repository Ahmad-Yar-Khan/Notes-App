// seed.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.note.createMany({
    data: [
      {
        title: "First Note",
        noteText: "This is the first note in the database.",
        date: new Date(),
        status: true, // pending
      },
      {
        title: "Shopping List",
        noteText: "Eggs, Milk, Bread, Butter",
        date: new Date(),
        status: false, // not pending
      },
      {
        title: "Todo",
        noteText: "Finish the React frontend for the notes app.",
        date: new Date(),
        status: true,
      },
    ],
  });

  await prisma.users.createMany({
    data: [
      {
        username: "ayk",
        password: "ayk123",
        FirstName: "Ahmad",
        LastName: "Yar",
        createdAt: new Date(),
      },
    ],
  });
  console.log("Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
