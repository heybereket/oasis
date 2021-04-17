import { join } from "path";
import { mergeResolvers } from "@graphql-tools/merge";
import { loadFiles } from "@graphql-tools/load-files";
import dirname from "./utils/dirname";
import { IResolvers } from "apollo-server-micro";

export default async function getResolvers(): Promise<IResolvers> {
  const resolversArray = await loadFiles(
    join(dirname(), "../api/src/modules"),
    {
      ignoreIndex: true,
      requireMethod: async (path) => {
        console.log(path);
        return await import(join(dirname(), path));
      },
    }
  );

  return mergeResolvers(resolversArray);
}
