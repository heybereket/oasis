import { glob } from "glob";
import { join } from "path";

export const getResolvers = (): Promise<Function[]> | Function[] => {
  if (process.env.NODE_ENV === "development" && !process.env.IS_NEXT) {
    const ROOT = process.env.PROJECT_ROOT
      ? join(process.env.PROJECT_ROOT, "./packages/api/dist")
      : __dirname;

    return new Promise((resolve) => {
      glob(join(ROOT, "./modules/**/resolvers/*.js"), (err, absolutes) => {
        if (err) console.error("Error while glob! ", err);

        const filenames = absolutes.map(
          (filename) => "." + filename.slice(ROOT.length)
        );

        resolve(filenames.map((filename) => require(filename).default));
      });
    });
  }

  // In a Next.js environment, just give the js file
  return require("./__resolvers");
};
