import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { zip } from 'lodash-es';

const SHAPE_POINTS = {
  X: 1,
  Y: 2,
  Z: 3,
};

const MATCHUPS = {
  A: {
    X: 3,
    Y: 6,
    Z: 0,
  },
  B: {
    X: 0,
    Y: 3,
    Z: 6,
  },
  C: {
    X: 6,
    Y: 0,
    Z: 3,
  },
};

function playGame(enemyShape, playerShape) {
  return MATCHUPS[enemyShape][playerShape];
}

async function main() {
  const input = await readFile(resolve('input/encrypted-strategy-guide.txt'), {
    encoding: 'utf8',
  });

  const games = input.split('\n').map((line) => line.split(' '));

  const gamePoints = games.map((game) => playGame(...game));
  const shapeChoicePoints = games.map((game) => SHAPE_POINTS[game[1]]);

  const strategyScore = zip(gamePoints, shapeChoicePoints).reduce((prev, points) => prev + points[0] + points[1], 0);

  console.log(`Total score according to strategy guide: ${strategyScore} points`);
}

main().catch(console.error);
