import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function utcDateOnly(value: Date) {
  return new Date(`${value.toISOString().slice(0, 10)}T00:00:00.000Z`);
}

async function main() {
  const menuDate = utcDateOnly(new Date());
  await prisma.meal.deleteMany({ where: { menuDate } });
  await prisma.meal.createMany({
    data: [
      { name: "Pileći rižoto", description: "Pileći rižoto s povrćem", menuDate, availablePortions: 20, active: true },
      { name: "Tjestenina s rajčicom", description: "Tjestenina u umaku od rajčice", menuDate, availablePortions: 15, active: true },
      { name: "Varivo od graha", description: "Grah s povrćem", menuDate, availablePortions: 12, active: true }
    ]
  });
  console.log(`Seedan je jelovnik za ${menuDate.toISOString().slice(0, 10)}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
