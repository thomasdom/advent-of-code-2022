import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';
import { resolve } from 'node:path';
import { max } from 'lodash-es';

async function main() {
  const input = await readFile(resolve('input/forest.txt'), {
    encoding: 'utf8',
  });
  const forest = input
    .trim()
    .split(EOL)
    .map((line) => line.split(''))
    .map((line) => line.map(Number));

  const scenicScores = [];

  for (let i = 0; i < forest.length; ++i) {
    for (let j = 0; j < forest[i].length; ++j) {
      let leftVisibility = 0;
      let rightVisibility = 0;
      let topVisibility = 0;
      let bottomVisibility = 0;

      for (let a = j - 1; a >= 0; a--) {
        if (forest[i][a] >= forest[i][j]) {
          break;
        }
        leftVisibility += 1;
      }

      for (let a = j + 1; a < forest[i].length; a++) {
        if (forest[i][a] >= forest[i][j]) {
          break;
        }
        rightVisibility += 1;
      }

      for (let a = i - 1; a >= 0; a--) {
        if (forest[a][j] >= forest[i][j]) {
          break;
        }
        topVisibility += 1;
      }

      for (let a = i + 1; a < forest.length; a++) {
        bottomVisibility += 1;
        if (forest[a][j] >= forest[i][j]) {
          break;
        }
      }

      scenicScores.push(leftVisibility * rightVisibility * topVisibility * bottomVisibility);
    }
  }

  const highestScenicScore = max(scenicScores);

  console.log(`The tree with the highest scenic score has a value of ${highestScenicScore}.`);
}

main().catch(console.error);
