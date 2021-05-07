export const getAPIBaseURL = (): string => {
  return `${process.env.NEXT_PUBLIC_BASE_API_URL}`;
}

export const getGQLBaseURL = (): string => {
  return `${getAPIBaseURL()}/graphql`;
}
