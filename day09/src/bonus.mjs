import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';
import { resolve } from 'node:path';

const visitedPositions = {
  '0;0': 1,
};
const headPosition = { x: 0, y: 0 };
const tailPosition = { x: 0, y: 0 };

function registerTailPosition() {
  `${tailPosition.x};${tailPosition.y}` in visitedPositions
    ? visitedPositions[`${tailPosition.x};${tailPosition.y}`]++
    : (visitedPositions[`${tailPosition.x};${tailPosition.y}`] = 1);
}
async function main() {
  const input = await readFile(resolve('input/moves.txt'), {
    encoding: 'utf8',
  });
  const moves = input
    .trim()
    .split(EOL)
    .map((move) => move.split(' '))
    .map((move) => [move[0], Number(move[1])]);

  for (const [direction, steps] of moves) {
    switch (direction) {
      case 'U':
        for (let i = 0; i < steps; ++i) {
          headPosition.y += 1;
          if (Math.abs(headPosition.y - tailPosition.y) >= 2) {
            tailPosition.x = headPosition.x;
            tailPosition.y = headPosition.y - 1;
          }
          registerTailPosition();
        }
        break;
      case 'D':
        for (let i = 0; i < steps; ++i) {
          headPosition.y -= 1;
          if (Math.abs(headPosition.y - tailPosition.y) >= 2) {
            tailPosition.x = headPosition.x;
            tailPosition.y = headPosition.y + 1;
          }
          registerTailPosition();
        }
        break;
      case 'L':
        for (let i = 0; i < steps; ++i) {
          headPosition.x -= 1;
          if (Math.abs(headPosition.x - tailPosition.x) >= 2) {
            tailPosition.y = headPosition.y;
            tailPosition.x = headPosition.x + 1;
          }
          registerTailPosition();
        }
        break;
      case 'R':
        for (let i = 0; i < steps; ++i) {
          headPosition.x += 1;
          if (Math.abs(headPosition.x - tailPosition.x) >= 2) {
            tailPosition.y = headPosition.y;
            tailPosition.x = headPosition.x - 1;
          }
          registerTailPosition();
        }
        break;
      default:
        break;
    }
  }
  const count = Object.keys(visitedPositions).length;

  console.log(`Rope tail visited a total of ${count} positions.`);
}

main().catch(console.error);
