import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';
import { resolve } from 'node:path';

async function main() {
  const input = await readFile(resolve('input/forest.txt'), {
    encoding: 'utf8',
  });
  const forest = input
    .trim()
    .split(EOL)
    .map((line) => line.split(''));

  const visibilityMatrix = forest.map((trees) => trees.map(() => false));

  // Left and right
  for (let i = 0; i < forest.length; ++i) {
    let currentHighestTree = -1;
    for (let j = 0; j < forest[i].length; ++j) {
      if (forest[i][j] > currentHighestTree) {
        currentHighestTree = forest[i][j];
        visibilityMatrix[i][j] = true;
      }
    }
    currentHighestTree = -1;
    for (let j = forest[i].length - 1; j >= 0; --j) {
      if (forest[i][j] > currentHighestTree) {
        currentHighestTree = forest[i][j];
        visibilityMatrix[i][j] = true;
      }
    }
  }

  // Top and bottom
  for (let i = 0; i < forest[0].length; ++i) {
    let currentHighestTree = -1;
    for (let j = 0; j < forest.length; ++j) {
      if (forest[j][i] > currentHighestTree) {
        currentHighestTree = forest[j][i];
        visibilityMatrix[j][i] = true;
      }
    }
    currentHighestTree = -1;
    for (let j = forest[i].length - 1; j >= 0; --j) {
      if (forest[j][i] > currentHighestTree) {
        currentHighestTree = forest[j][i];
        visibilityMatrix[j][i] = true;
      }
    }
  }

  const totalVisibleTrees = visibilityMatrix.reduce(
    (count, trees) => count + trees.reduce((count, tree) => (tree ? count + 1 : count), 0),
    0
  );

  console.log(`The number of visible trees from every side of forest is ${totalVisibleTrees}.`);
}

main().catch(console.error);
