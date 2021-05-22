const vsCodeFunction = Function(`
  // forgive me for my sins
  if (typeof acquireVsCodeApi == 'function') {
    return acquireVsCodeApi();
  } else {
    return undefined;
  }
  `);
export const vscode = vsCodeFunction();
