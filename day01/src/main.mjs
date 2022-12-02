import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

async function main() {
  const input = await readFile(resolve("input/calories.txt"), {
    encoding: "utf8",
  });

  const caloriesByElf = input.split("\n\n").map((rawStrings) =>
    rawStrings
      .split("\n")
      .map((numberString) => parseInt(numberString, 10))
      .reduce((prev, curr) => prev + curr, 0)
  );

  const maxCalories = Math.max(...caloriesByElf);
  const elveCarryingMaxCalories = caloriesByElf.indexOf(maxCalories);

  console.log(
    `Elve #${elveCarryingMaxCalories} carries ${maxCalories} calories`
  );
}

main().catch(console.error);
