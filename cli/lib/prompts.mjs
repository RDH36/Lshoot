import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { colors } from "./ui.mjs";

const Q = colors.cyan("?");
const HINT = colors.dim;

function createInterface() {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  rl.on("SIGINT", () => {
    stdout.write("\n" + colors.dim("Cancelled.") + "\n");
    process.exit(130);
  });
  return rl;
}

export async function text({ message, defaultValue, validate }) {
  const rl = createInterface();
  try {
    while (true) {
      const hint = defaultValue ? HINT(` (${defaultValue})`) : "";
      const raw = (await rl.question(`${Q} ${message}${hint} `)).trim();
      const value = raw === "" ? defaultValue ?? "" : raw;
      if (validate) {
        const err = validate(value);
        if (err) {
          stdout.write(`  ${colors.red("✗")} ${err}\n`);
          continue;
        }
      }
      if (value === "" && defaultValue === undefined) {
        stdout.write(`  ${colors.red("✗")} Value required.\n`);
        continue;
      }
      return value;
    }
  } finally {
    rl.close();
  }
}

export async function confirm({ message, defaultValue = true }) {
  const rl = createInterface();
  try {
    const hint = HINT(defaultValue ? " (Y/n)" : " (y/N)");
    const raw = (await rl.question(`${Q} ${message}${hint} `)).trim().toLowerCase();
    if (raw === "") return defaultValue;
    return raw === "y" || raw === "yes" || raw === "o" || raw === "oui";
  } finally {
    rl.close();
  }
}

export async function select({ message, options, defaultIndex = 0 }) {
  const rl = createInterface();
  try {
    stdout.write(`${Q} ${message}\n`);
    options.forEach((opt, i) => {
      const marker = i === defaultIndex ? colors.cyan("›") : " ";
      const label = i === defaultIndex ? colors.bold(opt.label) : opt.label;
      const desc = opt.description ? HINT(`  — ${opt.description}`) : "";
      stdout.write(`  ${marker} ${i + 1}. ${label}${desc}\n`);
    });
    while (true) {
      const raw = (
        await rl.question(
          HINT(`  Enter a number (1-${options.length}, default ${defaultIndex + 1}): `),
        )
      ).trim();
      if (raw === "") return options[defaultIndex].value;
      const n = Number.parseInt(raw, 10);
      if (Number.isInteger(n) && n >= 1 && n <= options.length) {
        return options[n - 1].value;
      }
      stdout.write(`  ${colors.red("✗")} Invalid choice.\n`);
    }
  } finally {
    rl.close();
  }
}
