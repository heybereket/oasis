import { createAPIHandler } from ".";
import { createServer } from "http";

(async () => {
  const PORT = process.env.PORT || 4000;
  const server = createServer(await createAPIHandler());

  server.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}/api/graphql`)
  );
})();
