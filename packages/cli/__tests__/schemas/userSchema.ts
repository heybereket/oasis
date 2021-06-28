export const user = {
  $id: 'post',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'represents an oasis user, used for validating output',
  properties: {
    id: { type: 'string' },
    banner: { type: ['null', 'string'] },
    avatar: { type: 'string' },
    github: { type: ['null', 'string'] },
    twitter: { type: ['null', 'string'] },
    discord: { type: ['null', 'string'] },
    google: { type: ['null', 'string'] },
    bio: { type: ['null', 'string'] },
    username: { type: 'string' },
    name: { type: 'string' },
    verified: { type: 'boolean' },
    badges: { type: 'array' },
    followers: {
      type: 'object',
      properties: {
        total: { type: 'number' },
      },
    },
    following: {
      type: 'object',
      properties: {
        total: { type: 'number' },
      },
    },
    posts: {
      type: 'object',
      properties: {
        total: { type: 'number' },
      },
    },
  },
};
