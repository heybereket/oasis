import { createApolloServer } from ".";
import { createServer } from "http";

(async () => {
  const apolloServer = await createApolloServer();
  const httpServer = createServer(
    apolloServer.createHandler({ path: "/api/graphql" })
  );
  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}/api/graphql`)
  );
})();
