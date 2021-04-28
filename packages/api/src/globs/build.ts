import { resolveGlob } from "./resolve";
import patterns from "./globPatterns";
import { writeFileSync } from "fs";

(async () => {
  let output = "";

  for (const [key, pattern] of Object.entries(patterns)) {
    const filenames = await resolveGlob(pattern);

    output += `exports["${key}"] = [\n${filenames
      .map((filename) => `  require("${filename}").default`)
      .join(",\n")}\n]\n\n`;
  }

  writeFileSync("./dist/globs/__globs.js", output);
})();
