import { spawn } from "node:child_process";

export function run(cmd, args, options = {}) {
  const { cwd, silent = false, allowFail = false, env } = options;

  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd,
      env: { ...process.env, ...(env ?? {}) },
      shell: process.platform === "win32",
      stdio: silent ? ["ignore", "pipe", "pipe"] : "inherit",
    });

    let stdout = "";
    let stderr = "";

    if (silent) {
      child.stdout?.on("data", (chunk) => {
        stdout += chunk.toString();
      });
      child.stderr?.on("data", (chunk) => {
        stderr += chunk.toString();
      });
    }

    child.on("error", (err) => {
      reject(new ExecError(`Failed to spawn '${cmd}': ${err.message}`, -1, "", ""));
    });

    child.on("close", (code) => {
      const result = { code: code ?? -1, stdout, stderr };
      if (code === 0 || allowFail) {
        resolve(result);
      } else {
        reject(
          new ExecError(
            `Command '${cmd} ${args.join(" ")}' failed with exit code ${code}`,
            code ?? -1,
            stdout,
            stderr,
          ),
        );
      }
    });
  });
}

export async function tryRun(cmd, args, options = {}) {
  try {
    return await run(cmd, args, { ...options, silent: true, allowFail: true });
  } catch (err) {
    return { code: -1, stdout: "", stderr: err instanceof Error ? err.message : String(err) };
  }
}

export class ExecError extends Error {
  constructor(message, code, stdout, stderr) {
    super(message);
    this.name = "ExecError";
    this.code = code;
    this.stdout = stdout;
    this.stderr = stderr;
  }
}
