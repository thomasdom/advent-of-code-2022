import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';
import { resolve } from 'node:path';
import { sum } from 'lodash-es';
async function main() {
  const input = await readFile(resolve('input/program.txt'), {
    encoding: 'utf8',
  });
  const instructions = input.trim().split(EOL);

  let X = 1;
  let instructionPointer = 0;
  let currentCycle = 0;

  let operation = null;
  let operand = 0;

  function printScreen() {
    if ([X - 1, X, X + 1].includes(currentCycle % 40)) {
      process.stdout.write('#');
    } else {
      process.stdout.write('.');
    }
    if (currentCycle % 40 === 0) {
      process.stdout.write(EOL);
    }
  }

  while (instructionPointer < instructions.length || operation) {
    currentCycle++;
    printScreen();
    if (/^noop$/.test(instructions[instructionPointer]) && !operation) {
      instructionPointer++;
      continue;
    }
    if (/^addx (-?\d+)$/.test(instructions[instructionPointer]) && !operation) {
      operation = 'addx';
      [, operand] = instructions[instructionPointer].match(/^addx ([-\d]+)$/);
      operand = Number(operand);
      continue;
    }
    if (operation === 'addx') {
      operation = null;
      X += operand;
      operand = 0;
      instructionPointer++;
    }
  }
}

main().catch(console.error);
