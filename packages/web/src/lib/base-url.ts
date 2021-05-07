export function getAPIBaseURL(): string {
  return `${process.env.NEXT_PUBLIC_BASE_API_URL}`;
}

export function getGQLBaseURL(): string {
  return `${getAPIBaseURL()}/graphql`;
}
