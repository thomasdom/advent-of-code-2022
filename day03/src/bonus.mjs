import { readFile } from 'fs/promises';
import { EOL } from 'os';
import { resolve } from 'path';
import { chunk, intersection, sum } from 'lodash-es';

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
  const groups = chunk(rucksacks, 3);
  const groupBadges = groups.map((group) => intersection(...group.map((g) => g.split('')))[0]);
  const sumOfPriorities = sum(groupBadges.map(calculatePriorityForItem));

  console.log(`The sum of priorities for rucksack groups is ${sumOfPriorities}.`);
}

main().catch(console.error);
