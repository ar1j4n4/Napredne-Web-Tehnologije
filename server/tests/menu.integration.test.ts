import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";

const app = createApp();
const testDateText = "2030-01-15";
const testDate = new Date(`${testDateText}T00:00:00.000Z`);
const testMealName = "F1 DB dokaz - testni obrok";

beforeAll(async () => {
  await prisma.meal.deleteMany({ where: { menuDate: testDate } });
  await prisma.meal.create({
    data: {
      name: testMealName,
      description: "Zapis koji test namjerno stvara u PostgreSQL test bazi.",
      menuDate: testDate,
      availablePortions: 7,
      active: true
    }
  });
});

afterAll(async () => {
  await prisma.meal.deleteMany({ where: { menuDate: testDate } });
  await prisma.$disconnect();
});

describe("Phase-1 API", () => {
  it("vraća health smoke odgovor", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true, service: "mealsync-api" });
  });

  it("čita dnevni jelovnik iz stvarne test baze", async () => {
    const response = await request(app).get(`/api/menu?date=${testDateText}`);
    expect(response.status).toBe(200);
    expect(response.body.date).toBe(testDateText);
    expect(response.body.items).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: testMealName, availablePortions: 7 })])
    );
  });

  it("odbija neispravan datum strukturiranom 400 greškom", async () => {
    const response = await request(app).get("/api/menu?date=nije-datum");
    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
    expect(response.body.error.message).toBeTypeOf("string");
  });
});
