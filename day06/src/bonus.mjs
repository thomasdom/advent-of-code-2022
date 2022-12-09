import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { uniq } from 'lodash-es';

const MARKER_LENGTH = 14;
async function main() {
  const input = await readFile(resolve('input/signal.txt'), {
    encoding: 'utf8',
  });
  const signal = input.trim().trim('\n');
  let position = 0;
  while (uniq(signal.substr(position, MARKER_LENGTH).split('')).length !== MARKER_LENGTH) {
    position++;
  }
  let startOfPacketPosition = position + MARKER_LENGTH;
  console.log(`The start-of-packet marker is at position ${startOfPacketPosition}.`);
}

main().catch(console.error);
