// main.ts — gta6-clipper-01 entry (Node 22, standard library only).
// The video itself is the entry, so this program has one job: copy
// VIDEO.json from the repository root into /output/VIDEO.json, where the
// gate reads it. The house reads the video's views from YouTube; nothing
// this program writes about the video is scored.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
const dest = join(outDir, 'VIDEO.json');
try {
  copyFileSync(join(botDir, 'VIDEO.json'), dest);
} catch (err) {
  console.error(`Could not copy VIDEO.json from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}

// Confirm the hand-in is a readable VIDEO.json with a url, so a broken
// placeholder is caught here instead of at the gate.
try {
  const video = JSON.parse(readFileSync(dest, 'utf8')) as { url?: unknown };
  if (typeof video.url !== 'string' || video.url.length === 0) {
    throw new Error('VIDEO.json carries no url string');
  }
} catch (err) {
  console.error(`VIDEO.json did not validate: ${(err as Error).message}`);
  process.exit(1);
}
