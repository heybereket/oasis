// import { glob } from "glob";
// import { join } from "path";
// import { writeFileSync } from "fs";
// import { resolversPattern } from "./globs/globPatterns";

// glob(join(__dirname, resolversPattern), (err, absolutes) => {
//   if (err) console.error("Error while glob! ", err);

//   const filenames = absolutes.map(
//     (filename) => "." + filename.slice(__dirname.length)
//   );

//   let count = 0;

//   const output =
//     filenames
//       .map((filename) => {
//         return `var R${count++} = require("${filename}").default;`;
//       })
//       .join("\n") +
//     `\n\nmodule.exports = [${Array(count)
//       .fill(0)
//       .map((_, i) => "R" + i)}]`;

//   writeFileSync("./dist/__resolvers.js", output);
// });
