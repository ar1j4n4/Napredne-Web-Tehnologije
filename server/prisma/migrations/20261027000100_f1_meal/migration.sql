CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "menuDate" DATE NOT NULL,
    "availablePortions" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Meal_menuDate_active_idx" ON "Meal"("menuDate", "active");
CREATE INDEX "Meal_name_idx" ON "Meal"("name");
