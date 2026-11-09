import { spawnSync } from "node:child_process";

const testDatabaseUrl = process.env.TEST_DATABASE_URL;
if (!testDatabaseUrl) {
  console.error("TEST_DATABASE_URL nije postavljen. Kopiraj .env.example u .env.");
  process.exit(1);
}

const env = { ...process.env, DATABASE_URL: testDatabaseUrl, NODE_ENV: "test" };

function run(args: string[]) {
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env,
    shell: process.platform === "win32",
  });

  if (result.status !== 0) process.exit(result.status ?? 1);
}

run(["run", "prisma:deploy"]);
run(["run", "test:integration:vitest"]);
