import { ApolloServer } from "apollo-server-express";
import { IncomingMessage } from "http";
import { getSchema } from "./utils/getSchema";
import { contextFromToken } from "./utils/contextFromToken";

export const createApolloServer = async () =>
  new ApolloServer({
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
