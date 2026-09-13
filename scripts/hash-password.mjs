#!/usr/bin/env node
// Generates ADMIN_PASSWORD_HASH (scrypt) and a random SESSION_SECRET.
// Usage: npm run hash-password   (the password is read from a hidden prompt or stdin)
import { randomBytes, scrypt } from "node:crypto";
import { createInterface } from "node:readline";

const N = 32768;
const r = 8;
const p = 1;
const KEY_LENGTH = 64;

function readPassword() {
  if (!process.stdin.isTTY) {
    return new Promise((resolve) => {
      let data = "";
      process.stdin.on("data", (chunk) => (data += chunk));
      process.stdin.on("end", () => resolve(data.replace(/\r?\n$/, "")));
    });
  }
  return new Promise((resolve) => {
    const prompt = "Admin password (min 12 characters): ";
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = (s) => rl.output.write(s.startsWith(prompt) ? prompt : s.includes("\n") ? "\n" : "*");
    rl.question(prompt, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });
  });
}

const password = (await readPassword()).normalize("NFKC");
if (password.length < 12) {
  console.error("Use at least 12 characters.");
  process.exit(1);
}

const salt = randomBytes(16);
scrypt(password, salt, KEY_LENGTH, { N, r, p, maxmem: 256 * N * r }, (err, key) => {
  if (err) throw err;
  console.log("\nAdd these to Vercel → Settings → Environment Variables (and .env.local for dev):\n");
  console.log(`ADMIN_PASSWORD_HASH=scrypt:${N}:${r}:${p}:${salt.toString("base64url")}:${key.toString("base64url")}`);
  console.log(`SESSION_SECRET=${randomBytes(48).toString("base64url")}`);
});
