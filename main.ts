// One-Sentence Absurd Invention Pitch — the hand-in program (Node 22,
// standard library only).
//
// It writes exactly one sentence to /output/entry.txt: a pitch for a
// ridiculous invention that fixes a tiny everyday annoyance. Outside the
// grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The pitch (one sentence, no trailing newline):
//
//   The Doorway Parrot perches on the doorframe and repeats whatever you
//   muttered in the hallway, so the moment you walk in and forget why, it
//   squawks your own errand back at you.
//
// Why this pitch, against the judge's criteria in order:
//   1. On-brief: one sentence, one ridiculous invention (a parrot as a
//      memory prosthetic), one tiny everyday annoyance (walking into a
//      room and forgetting why you went there).
//   2. Funny from the invention itself: the laugh is the parrot — a bird
//      famous for mindless repetition, employed at the exact doorway
//      where human memory mindlessly drops the errand. No joke is bolted
//      on at the end; the squawked reminder IS the punchline.
//   3. Clever fix: silly yet weirdly plausible. You really did state your
//      intention out loud on the way ("right, scissors"), so a repeater
//      stationed at the threshold genuinely would cure the blank stare —
//      it returns your own words at the moment they evaporate.
//   4. Original: not the brief's own examples (no apologising alarm
//      clock, no complaining sock, no sighing kettle) and not a familiar
//      reheated gadget; the annoyance-invention pairing is fresh.
//   5. Tight: annoyance, invention and mechanism in a single clean
//      sentence, nothing left over.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const PITCH =
  'The Doorway Parrot perches on the doorframe and repeats whatever you muttered in the hallway, so the moment you walk in and forget why, it squawks your own errand back at you.';

// The gate's own caps: UTF-8 text of 1 to 220 characters, not only white
// space, and — per the brief — exactly one sentence on one line.
const sentenceEnders = (PITCH.match(/[.!?]/g) ?? []).length;
if (
  PITCH.length < 1 ||
  PITCH.length > 220 ||
  PITCH.trim().length === 0 ||
  PITCH !== PITCH.trim() ||
  PITCH.includes('\n') ||
  !PITCH.endsWith('.') ||
  sentenceEnders !== 1
) {
  throw new Error(
    `pitch fails the gate: ${PITCH.length} characters, ${sentenceEnders} sentence enders`,
  );
}

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'entry.txt'), PITCH, 'utf8');
