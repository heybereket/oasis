import { join } from "path";

export const rootPath = process.env.IS_NEXT
  ? join(process.env.PROJECT_ROOT, "packages/api")
  : join(__dirname, "../..");
