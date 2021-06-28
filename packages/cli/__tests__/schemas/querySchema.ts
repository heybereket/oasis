export const query = {
  $id: 'query',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description:
    'represents a response from a search query, used for validating output',
  properties: {
    __typename: { type: 'string' },
    id: { type: 'string' },
  },
  required: ['__typename', 'id'],
};
