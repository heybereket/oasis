import { join } from "path";
import glob from "glob";

const dirname = join(__dirname, "..");

export function resolveGlob(pattern: string): Promise<string[]> {
  return new Promise((resolve) => {
    glob(join(dirname, pattern), (err, absolutes) => {
      if (err) console.error("Error while glob! ", err);

      resolve(
        absolutes.map((filename) => ".." + filename.slice(dirname.length))
      );
    });
  });
}
