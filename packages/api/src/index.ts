import "reflect-metadata";
import { config } from "dotenv";

config();

import { createConnection } from "typeorm";
import { ormconfig } from "./ormconfig";
import { ApolloServer } from "apollo-server";
import { IncomingMessage } from "http";
import { getSchema } from "./utils/getSchema";
import { contextFromToken } from "./utils/contextFromToken";
export { getSchema };

(async () => {
  await createConnection(ormconfig);

  const apolloServer = new ApolloServer({
    schema: await getSchema(),
    context: async ({ req }: { req: IncomingMessage }) => {
      const cookies = req.headers.cookie ?? "";
      const cookiesArr = cookies.split("; ");
      const cookieData = cookiesArr.find((row) => row.startsWith("token="));
      const token = cookieData?.split("=")[1];

      const socketInfo = req.socket.address();

      if (!token || token === "") return { hasAuth: false, socketInfo };

      return contextFromToken(token, socketInfo);
    },
    playground: true,
    introspection: true,
  });

  const PORT = process.env.PORT || 4000;

  await apolloServer.listen(PORT);

  console.log(`Server started on http://localhost:${PORT}/graphql`);
})();
