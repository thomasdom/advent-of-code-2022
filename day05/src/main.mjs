import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';
import { resolve } from 'node:path';
import { compact, initial, last, tail, trim, zip } from 'lodash-es';
async function main() {
  const input = await readFile(resolve('input/stacks.txt'), {
    encoding: 'utf8',
  });
  const [rawStacks, rawInstructions] = input.split(`${EOL}${EOL}`);

  const stacks = zip(
    ...initial(rawStacks.split(EOL))
      .map((stack) => tail(stack.match(/^(.{3}) (.{3}) (.{3}) (.{3}) (.{3}) (.{3}) (.{3}) (.{3}) (.{3})$/)))
      .map((stack) => stack.map((s) => trim(s, ' []')))
      .reverse()
  ).map((stack) => compact(stack));

  const instructions = rawInstructions
    .split(EOL)
    .map((instruction) => tail(instruction.match(/^move (\d+) from (\d+) to (\d+)/)))
    .map((instruction) => instruction.map(Number))
    .map((instruction) => [instruction[0], instruction[1] - 1, instruction[2] - 1]);

  const arrangedStacks = instructions.reduce((state, instruction) => {
    const [nbOperations, source, destination] = instruction;
    for (let i = 0; i < nbOperations; ++i) {
      state[destination].push(state[source].pop());
    }
    return state;
  }, stacks);

  const secret = arrangedStacks.map(last).join('');
  console.log(`The secret message is ${secret}.`);
}

main().catch(console.error);
