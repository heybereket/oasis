export async function importAll(key: string): Promise<Function[]> {
  // If in dev, build it right now
  if (process.env.NODE_ENV === "development" && !process.env.IS_NEXT) {
    require("./build");
  }

  // Now just return the content in the file
  return require("./__globs")[key];
}
