import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';
import { resolve } from 'node:path';
import { min, sum } from 'lodash-es';

const fileSystem = {};

function calculateSizeForPath(targetPath, size) {
  let path = targetPath.slice();
  while (path !== '/') {
    if (!(path in fileSystem)) {
      fileSystem[path] = size;
    } else {
      fileSystem[path] += size;
    }
    path = resolve(path, '..');
  }
  if (!(path in fileSystem)) {
    fileSystem[path] = size;
  } else {
    fileSystem[path] += size;
  }
}

async function main() {
  const input = await readFile(resolve('input/history.txt'), {
    encoding: 'utf8',
  });
  const commands = input.split(EOL);

  let currentPath = '';
  let ls = false;

  for (const command of commands) {
    if (/^\$ cd (.+)$/.test(command)) {
      const [, newPath] = command.match(/^\$ cd (.+)$/);
      currentPath = resolve(currentPath, newPath);
    }
    if (/^\$ ls$/.test(command)) {
      continue;
    }
    if (/^(\d+) (.+)$/.test(command)) {
      const [, fileSize] = command.match(/^(\d+) (.+)$/);
      calculateSizeForPath(currentPath, BigInt(fileSize));
    }
  }

  const currentlyAvailableSpace = 70000000n - fileSystem['/'];
  const sizeOfSmallestDirectoryToDelete = min(
    Object.values(fileSystem).filter((size) => currentlyAvailableSpace + size >= 30000000n)
  );
  console.log(
    `The smallest directory to delete to be able to upgrade the system is of size ${sizeOfSmallestDirectoryToDelete}.`
  );
}

main().catch(console.error);
