import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function main() {
  const input = await readFile(resolve('input/calories.txt'), {
    encoding: 'utf8',
  });

  const topCaloriesByElf = input.split('\n\n').map((rawStrings) =>
    rawStrings
      .split('\n')
      .map((numberString) => parseInt(numberString, 10))
      .reduce((prev, curr) => prev + curr, 0)
  );

  topCaloriesByElf.sort((a, b) => a - b).reverse();

  console.log(
    `#1: ${topCaloriesByElf[0]} calories - #2: ${topCaloriesByElf[1]} calories - #3: ${topCaloriesByElf[2]} calories`
  );

  console.log(`total: ${topCaloriesByElf[0] + topCaloriesByElf[1] + topCaloriesByElf[2]} calories`);
}

main().catch(console.error);
