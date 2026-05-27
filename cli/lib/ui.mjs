const supportsColor =
  process.stdout.isTTY && process.env.TERM !== "dumb" && !process.env.NO_COLOR;

const wrap = (open, close) => (text) =>
  supportsColor ? `\x1b[${open}m${text}\x1b[${close}m` : String(text);

export const colors = {
  reset: wrap(0, 0),
  bold: wrap(1, 22),
  dim: wrap(2, 22),
  red: wrap(31, 39),
  green: wrap(32, 39),
  yellow: wrap(33, 39),
  blue: wrap(34, 39),
  magenta: wrap(35, 39),
  cyan: wrap(36, 39),
  gray: wrap(90, 39),
};

const ACCENT = colors.green;

export function banner(title, subtitle) {
  const line = "━".repeat(Math.max(title.length, (subtitle ?? "").length) + 4);
  process.stdout.write("\n");
  process.stdout.write(colors.dim(line) + "\n");
  process.stdout.write("  " + colors.bold(ACCENT(title)) + "\n");
  if (subtitle) {
    process.stdout.write("  " + colors.gray(subtitle) + "\n");
  }
  process.stdout.write(colors.dim(line) + "\n\n");
}

export function info(msg) {
  process.stdout.write(`${colors.cyan("ℹ")} ${msg}\n`);
}

export function success(msg) {
  process.stdout.write(`${colors.green("✓")} ${msg}\n`);
}

export function warn(msg) {
  process.stdout.write(`${colors.yellow("⚠")} ${msg}\n`);
}

export function error(msg) {
  process.stderr.write(`${colors.red("✗")} ${msg}\n`);
}

export function step(msg) {
  process.stdout.write(`\n${colors.bold(ACCENT("→"))} ${colors.bold(msg)}\n`);
}

export function dim(msg) {
  process.stdout.write(`${colors.dim(msg)}\n`);
}

export function blank() {
  process.stdout.write("\n");
}

const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export function spinner(text) {
  let i = 0;
  let active = supportsColor;
  let interval = null;

  const render = () => {
    if (!active) return;
    process.stdout.write(
      `\r${ACCENT(SPINNER_FRAMES[i % SPINNER_FRAMES.length])} ${text}   `,
    );
    i++;
  };

  if (active) {
    render();
    interval = setInterval(render, 80);
  } else {
    process.stdout.write(`${text}...\n`);
  }

  return {
    stop(finalLine) {
      active = false;
      if (interval) clearInterval(interval);
      if (supportsColor) {
        process.stdout.write("\r\x1b[K");
      }
      if (finalLine) process.stdout.write(finalLine + "\n");
    },
  };
}

export function code(text) {
  return colors.cyan(text);
}

export function path(text) {
  return colors.magenta(text);
}
