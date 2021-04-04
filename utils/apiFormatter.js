export function formatError(errCode) {
  return JSON.stringify({ status: "error", error: errCode }, null, 3);
}

export function formatData(data) {
  return JSON.stringify(data, null, 3);
}

export function formatSuccess() {
  return JSON.stringify({ status: "success" }, null, 3);
}
