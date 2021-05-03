import { createAPIHandler } from ".";

(async () => {
  const PORT = process.env.PORT || 4000;
  const server = await createAPIHandler();

  server.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}/api/graphql`)
  );
})();
