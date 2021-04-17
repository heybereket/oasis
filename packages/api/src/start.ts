import { apolloServer } from ".";
import { createServer } from "http";

const PORT = process.env.PORT || 4000;

const server = createServer(
  apolloServer.createHandler({ path: "/api/graphql" })
);

server.listen(PORT, () =>
  console.log(
    `🚀 The GraphQL Playground is now running at http://localhost:${PORT}/api/graphql`
  )
);
