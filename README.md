---

## 🌴 Branches
- ```prod:``` dont touch, production code
- ```staging:``` testing/development; do changes here here
- ```old:``` v1.0 of oasis (no longer used)

## 🧱 Structure

| Folder                             |      Description      |
| :----------------------------------| :-------------------: |
| [`docs`](/docs)                    |     Documentation     |
| [`web`](/packages/web)             |   Next.js Frontend    |
| [`desktop`](desktop)               |    Electron Wrapper   |
| [`api`](/packages/api)             |     GraphQL API       |
| [`puppeteer`](/packages/puppeteer) |   Puppeteer Testing   |

## 🚀 Contributions

Oasis is open to contributions, but we recommend creating an issue or replying in a comment to let us know what you are working on first that way we don't overwrite each other or have many people adding the same feature/solving the same issue. <br/>

Interested in contributing? Read [CONTRIBUTING.md](/docs/CONTRIBUTING.md) for details on how to get started.

## 🔨 Oasis Web
```bash
# Install dependencies
$ yarn
 
# Start dev-server at port 3000
$ yarn dev
 
# Run all linters
$ yarn lint
```

## 💻 Oasis Desktop
Oasis uses ElectronJS for our desktop application. It's currently avaliable on all Windows, macOS, and Linux. <br/>
**Latest releases:** https://github.com/oasis-sh/oasis/releases/latest

```bash
# Install dependencies
$ yarn

# Change directories 
$ cd desktop 
 
# Run the application
$ yarn start

# Run on Windows: yarn run build:win
# Run on macOS: yarn run build:mac
# Run on Linux: yarn run build:lin
```

## 👋🏻 Maintainers 
- **Web:** [heybereket](https://github.com/heybereket), [goldyydev](https://github.com/goldyydev), [dk-raw](https://github.com/dk-raw), and [MattLawz](https://github.com/MattLawz)
- **Desktop:** [amitojsingh366](https://github.com/amitojsingh366)
- **Design:** [coderinblack08](https://github.com/coderinblack08)
- **API:** [vishy-dev](https://github.com/vishy-dev), and [Ongshu777](https://github.com/Ongshu777)

## ⌛ Status
- [x] Early Development: Started building the project.
- [x] Development: Movement/re-write using NextJS/TailwindCSS
- [x] Migration Completion: Finished the migration!
- [x] TypeScript: Converted codebase from JS > TS
- [ ] Public API: Work on releasing the Oasis API publicly 
- [ ] Redesign/write: 2nd site rewrite/implementation of the new redesign
- [ ] Alpha/Beta Testing (mostly trying to fix and solve bugs)
- [ ] Early Release: Soft Launch on Twitter
- [ ] Official Launch

## 📄 License
Oasis is open-source and is under the [MIT License](LICENSE). 
