import { apolloServer } from ".";
import { createServer } from "http";

const PORT = process.env.PORT || 4000;

const server = createServer(
  apolloServer.createHandler({ path: "/api/graphql" })
);

server.listen(PORT, () =>
  console.log(
    `The server started on port: ${PORT}\nGo to http://localhost:${PORT}/api/graphql for the playground!`
  )
);
