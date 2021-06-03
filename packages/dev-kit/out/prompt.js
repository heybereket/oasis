"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prompt = void 0;
const vscode = require("vscode");
const prompt = (all) => __awaiter(void 0, void 0, void 0, function* () {
    const answers = {};
    for (const obj of all) {
        if (obj.when && !obj.when(answers))
            continue;
        switch (obj.type) {
            case "list": {
                const ans = yield vscode.window.showQuickPick(obj.choices.map((c) => c.name));
                const { value } = obj.choices.find((c) => c.name === ans);
                answers[obj.name] = value;
                break;
            }
            case "input": {
                const msg = typeof obj.message === "function"
                    ? obj.message(answers)
                    : obj.message;
                const opts = {
                    prompt: msg,
                };
                if (obj.validate)
                    opts.validateInput = (val) => {
                        const v = obj.validate(val, answers);
                        if (v === false)
                            return "Invalid value!";
                        if (v === true)
                            return null;
                        return v;
                    };
                const val = (obj.name === "subject"
                    ? yield vscode.window.showQuickPick([
                        "global",
                        "api",
                        "bot-client",
                        "ui",
                        "web",
                        "vsc-extension",
                    ])
                    : yield vscode.window.showInputBox(opts)) || obj.default;
                answers[obj.name] = obj.filter ? obj.filter(val) : val;
                break;
            }
            case "confirm": {
                const val = yield vscode.window.showQuickPick(obj.default ? ["Yes", "No"] : ["No", "Yes"], {
                    placeHolder: obj.message,
                });
                const bool = val === "Yes" ? true : val === "No" ? false : obj.default;
                answers[obj.name] = bool;
            }
        }
    }
    return answers;
});
exports.prompt = prompt;
//# sourceMappingURL=prompt.js.map