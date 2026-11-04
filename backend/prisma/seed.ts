import "dotenv/config";
import { readFileSync } from "node:fs";
import { prisma } from "../src/lib/prisma.ts";

type RawExercise = {
  id: string;
  name: string;
  force: string | null;
  level: string;
  mechanic: string | null;
  equipment: string | null;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  images: string[];
};

const seedExercises = async () => {
  const file = new URL("./data/exercises.json", import.meta.url);
  const exercises: RawExercise[] = JSON.parse(readFileSync(file, "utf-8"));

  for (const ex of exercises) {
    const data = {
      name: ex.name,
      force: ex.force,
      level: ex.level,
      mechanic: ex.mechanic,
      equipment: ex.equipment,
      category: ex.category,
      primaryMuscles: ex.primaryMuscles,
      secondaryMuscles: ex.secondaryMuscles,
      instructions: ex.instructions,
      images: ex.images,
    };

    await prisma.exercise.upsert({
      where: { externalId: ex.id },
      update: data,
      create: { externalId: ex.id, ...data },
    });
  }

  console.log(`Seeded ${exercises.length} exercises`);
};

seedExercises()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
