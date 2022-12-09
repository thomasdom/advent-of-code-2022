import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';
import { resolve } from 'node:path';
import { range } from 'lodash-es';
async function main() {
  const input = await readFile(resolve('input/sections.txt'), {
    encoding: 'utf8',
  });
  const ranges = input
    .split(EOL)
    .map((assignment) => assignment.split(','))
    .map((assignment) => assignment.map((a) => a.split('-')))
    .map((assignment) => assignment.map((a) => range(Number(a[0]), Number(a[1]) + 1)));
  const overlaps = ranges.filter((r) => r[0].every((v) => r[1].includes(v)) || r[1].every((v) => r[0].includes(v)));

  console.log(`The number of overlaps is ${overlaps.length}.`);
}

main().catch(console.error);
