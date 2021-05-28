## TypeORM Migrations

- Migrations are in `packages/api/src/migrations`.
- Use `yarn typeorm:generate_migration <name>` from the API package root - or `yarn workspace @oasis/api typeorm:generate_migration <name>` from the monorepo root to generate a migration.
- Use `yarn typeorm:run_migrations` from the API package root - or `yarn workspace @oasis/api typeorm:run_migrations` to run the migrations.
