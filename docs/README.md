# 🔨 Contributing to Oasis

## Commit Messages
Oasis is following the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) standard for commit messages.

1. Run `yarn` in the project root
2. Add the files you want to commit with `git add [files]`
3. Run `yarn commit` in the project root for a interactive prompt to appear, and follow the instructions.

## Understanding Scripts
```bash
# Build all the Packages
$ yarn build:all

# Build a specific package
$ yarn build <package>

# Run the Web Application and UI Components
$ yarn dev
``` 

## Enviornment Variables
Follow the enviornment variable examples (located in **.env.example**) for `web` and `api`, to fill in your own .env file. <br/>
**Reminder:** Not all of the enviornment variables are required.

## Linting
```bash
# Run Prettier + Eslint Globally
$ yarn format

# Run Prettier 
$ yarn prettify

# Run Eslint
$ yarn lint
``` 

## TypeORM Migrations
```bash
# Generate a Migration command via the TypeORM Cli
$ yarn workspace @oasis-sh/api typeorm:generate_migration <name>

# Run the Migration
$ yarn workspace @oasis-sh/api typeorm:run_migrations
``` 

## Code of Conduct
Our code of conduct is viewable in [`CODE_OF_CONDUCT.md`](https://github.com/oasis-sh/oasis/blob/staging/.github/CODE_OF_CONDUCT.md).

## License
All contributions made to Oasis are under the [MIT License](LICENSE).
