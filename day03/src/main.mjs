import { readFile } from 'fs/promises';
import { EOL } from 'os';
import { resolve } from 'path';
import { intersection, sum } from 'lodash-es';

const calculatePriorityForItem = (item) => {
  if (/[a-z]/.test(item)) {
    return item.charCodeAt(0) - 96;
  }
  return item.charCodeAt(0) - 38;
};
async function main() {
  const input = await readFile(resolve('input/rucksacks.txt'), {
    encoding: 'utf8',
  });
  const rucksacks = input.split(EOL);
  const compartments = rucksacks.map((sack) =>
    [sack.slice(0, Math.ceil(sack.length / 2)), sack.slice(Math.ceil(sack.length / 2))].flat()
  );
  const commonItemsInRucksacks = compartments.map((sack) => intersection(sack[0].split(''), sack[1].split(''))[0]);
  const sumOfPriorities = sum(commonItemsInRucksacks.map(calculatePriorityForItem));

  console.log(`The sum of priorities for rucksack rearrangement is ${sumOfPriorities}.`);
}

main().catch(console.error);
