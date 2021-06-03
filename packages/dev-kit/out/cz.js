"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_1 = require("./prompt");
const options = {
    types: {
        feat: { description: "A new feature", title: "Features" },
        fix: { description: "A bug fix", title: "Bug Fixes" },
        docs: {
            description: "Documentation only changes",
            title: "Documentation",
        },
        style: {
            description: "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
            title: "Styles",
        },
        refactor: {
            description: "A code change that neither fixes a bug nor adds a feature",
            title: "Code Refactoring",
        },
        perf: {
            description: "A code change that improves performance",
            title: "Performance Improvements",
        },
        test: {
            description: "Adding missing tests or correcting existing tests",
            title: "Tests",
        },
        build: {
            description: "Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)",
            title: "Builds",
        },
        ci: {
            description: "Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)",
            title: "Continuous Integrations",
        },
        chore: {
            description: "Other changes that don't modify src or test files",
            title: "Chores",
        },
        revert: { description: "Reverts a previous commit", title: "Reverts" },
    },
    defaultType: undefined,
    defaultScope: "global",
    defaultSubject: undefined,
    defaultBody: undefined,
    defaultIssues: undefined,
    disableScopeLowerCase: undefined,
    disableSubjectLowerCase: undefined,
    maxHeaderWidth: 100,
    maxLineWidth: 100,
};
const { prompter } = require("cz-conventional-changelog/engine")(options);
function cz() {
    return new Promise((commit) => {
        prompter({ prompt: prompt_1.prompt }, commit);
    });
}
exports.default = cz;
//# sourceMappingURL=cz.js.map