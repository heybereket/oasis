import "reflect-metadata";
import { config } from "dotenv";
config();
import { createConnection } from "typeorm";
import { ormconfig } from "./ormconfig";
import { buildSchema } from "type-graphql";
import { join } from "path";
import { ApolloServer } from "apollo-server";

(async () => {
  await createConnection(ormconfig);

  const schema = await buildSchema({
    resolvers: [join(__dirname, "./modules/**/*.resolver.*")],
    emitSchemaFile: join(__dirname, "../schema.gql"),
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  const PORT = process.env.PORT || 4000;

  await apolloServer.listen(PORT);
  console.log(`Server started on http://localhost:${PORT}/graphql`);
})();
