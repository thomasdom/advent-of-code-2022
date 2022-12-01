import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

async function main() {
  const input = await readFile(resolve("input/calories.txt"), {
    encoding: "utf8",
  });

  const topCaloriesByElve = input.split("\n\n").map((rawStrings) =>
    rawStrings
      .split("\n")
      .map((numberString) => parseInt(numberString, 10))
      .reduce((prev, curr) => prev + curr, 0)
  );

  topCaloriesByElve.sort((a, b) => a - b).reverse();

  console.log(
    `#1: ${topCaloriesByElve[0]} calories - #2: ${topCaloriesByElve[1]} calories - #3: ${topCaloriesByElve[2]} calories`
  );

  console.log(
    `total: ${
      topCaloriesByElve[0] + topCaloriesByElve[1] + topCaloriesByElve[2]
    } calories`
  );
}

main().catch(console.error);
