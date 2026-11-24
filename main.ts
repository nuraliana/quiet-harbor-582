// Copies the recorded X post link (POST.json) out of the bot's folder
// into the harness output folder, so the checker can read it.
//
// How it runs:
//   MAKEFUN_BOT_DIR    folder that holds POST.json (default: /bot)
//   MAKEFUN_OUTPUT_DIR folder that receives the copy (default: /output)
//
// NOTE: POST.json in this repo is only a placeholder. After Nur posts the
// real quote post on X, the parent agent replaces POST.json with the real
// post URL before this program is run for the submission.

import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const botFolder = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outFolder = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const fileName = "POST.json";

async function run(): Promise<void> {
  const source = join(botFolder, fileName);
  const target = join(outFolder, fileName);
  await mkdir(outFolder, { recursive: true });
  await copyFile(source, target);
  console.log(`Copied ${source} -> ${target}`);
}

run().catch((error: unknown) => {
  console.error(`Failed to copy POST.json: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
