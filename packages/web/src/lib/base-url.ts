export function getAPIBaseURL(): string {
  return `http${process.env.NEXT_PUBLIC_SECURE_MODE === "true" ? 's' : ''}://${process.env.NEXT_PUBLIC_BASE_API_URL}`;
}

export function getGQLBaseURL(): string {
  return `${getAPIBaseURL()}/graphql`;
}
