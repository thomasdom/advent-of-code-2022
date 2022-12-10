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

  const signalStrengths = [];

  while (instructionPointer < instructions.length || operation) {
    currentCycle++;
    if (currentCycle % 40 === 20) {
      console.log(`Signal strength at cycle ${currentCycle}: ${currentCycle * X} dB.`);
      signalStrengths.push(currentCycle * X);
    }
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

  console.log(`Sum of signal strengths: ${sum(signalStrengths)}`);
}

main().catch(console.error);
