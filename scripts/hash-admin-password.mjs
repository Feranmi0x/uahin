import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
let password = "";
for await (const chunk of process.stdin) password += chunk;
password = password.replace(/\r?\n$/, "");

if (password.length < 12 || password.length > 1024) {
  console.error("Admin passwords must contain between 12 and 1024 characters.");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const hash = await scrypt(password, salt, 64);
password = "";
console.log(`${salt}:${hash.toString("hex")}`);
