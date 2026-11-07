import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

const router = Router();

function isRealDateOnly(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

const querySchema = z.object({
  date: z.string().refine(isRealDateOnly, "Datum mora biti stvarni datum u formatu YYYY-MM-DD.").optional()
});

router.get("/", async (req, res) => {
  const query = querySchema.parse(req.query);
  const dateText = query.date ?? new Date().toISOString().slice(0, 10);
  const menuDate = new Date(`${dateText}T00:00:00.000Z`);

  const items = await prisma.meal.findMany({
    where: { menuDate, active: true },
    orderBy: { name: "asc" }
  });

  res.json({ date: dateText, items });
});

export default router;
