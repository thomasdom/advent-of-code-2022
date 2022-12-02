import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

async function main() {
  const input = await readFile(resolve("input/encrypted-strategy-guide.txt"), {
    encoding: "utf8",
  });
}

main().catch(console.error);
