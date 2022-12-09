import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';
import { resolve } from 'node:path';
async function main() {
  const input = await readFile(resolve('input/EDIT_ME.txt'), {
    encoding: 'utf8',
  });
}

main().catch(console.error);
