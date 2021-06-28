export const post = {
  $id: 'post',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'represents an oasis post, used for validating output',
  properties: {
    message: { type: 'string' },
    author: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        username: { type: 'string' },
      },
      required: ['id', 'name', 'username'],
    },
    downvotes: { type: 'number' },
    upvotes: { type: 'number' },
  },
  required: ['message', 'author', 'downvotes', 'upvotes'],
};
