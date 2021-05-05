import { join } from "path";

export const rootPath = process.env.OASIS_API_SRC_PATH || join(__dirname, "../");

export const joinRoot = (...paths: string[]) => join(rootPath, ...paths);
