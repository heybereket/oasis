import "reflect-metadata";
import { config } from "dotenv";
config();
import { createConnection } from "typeorm";
import { ormconfig } from "./ormconfig";
import { ApolloServer } from "apollo-server";
import { getSchema } from "./utils/getSchema";

(async () => {
  await createConnection(ormconfig);

  const apolloServer = new ApolloServer({
    schema: await getSchema(),
  });

  const PORT = process.env.PORT || 4000;

  await apolloServer.listen(PORT);
  console.log(`Server started on http://localhost:${PORT}/graphql`);
})();
