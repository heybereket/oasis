import * as vscode from "vscode";

export const prompt = async (all: any[]) => {
  const answers: Record<any, any> = {};

  for (const obj of all) {
    if (obj.when && !obj.when(answers)) continue;

    switch (obj.type) {
      case "list": {
        const ans = await vscode.window.showQuickPick(
          obj.choices.map((c: any) => c.name)
        );

        const { value } = obj.choices.find(
          (c: { name: string }) => c.name === ans
        );

        answers[obj.name] = value;

        break;
      }
      case "input": {
        const msg =
          typeof obj.message === "function"
            ? obj.message(answers)
            : obj.message;

        const opts: vscode.InputBoxOptions = {
          prompt: msg,
        };

        if (obj.validate)
          opts.validateInput = (val: string) => {
            const v = obj.validate(val, answers);

            if (v === false) return "Invalid value!";
            if (v === true) return null;

            return v;
          };

        const val =
          (obj.name === "subject"
            ? await vscode.window.showQuickPick([
                "global",
                "api",
                "bot-client",
                "ui",
                "web",
                "vsc-extension",
              ])
            : await vscode.window.showInputBox(opts)) || obj.default;

        answers[obj.name] = obj.filter ? obj.filter(val) : val;

        break;
      }
      case "confirm": {
        const val = await vscode.window.showQuickPick(
          obj.default ? ["Yes", "No"] : ["No", "Yes"],
          {
            placeHolder: obj.message,
          }
        );

        const bool = val === "Yes" ? true : val === "No" ? false : obj.default;

        answers[obj.name] = bool;
      }
    }
  }

  return answers;
};
