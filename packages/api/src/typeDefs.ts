// @todo Handle these types, make a directory for them and add resolvers

// type ActivityEvent {
//   id: ID!
//   type: String!
//   eventString: String!
//   user: User
//   repo: Repo
// }

// type Comment {
//   id: ID!
//   author: User!
//   content: String!
//   likes: Int!
//   dislikes: Int!
// }

// type Post {
//   id: ID!
//   title: String!
//   content: String!
//   media: [String]
//   tags: [String]
//   comments: [Comment]
// }

import { join } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typesArray = loadFilesSync(join(__dirname, './modules'), { extensions: ['graphql', 'gql'] });

export default mergeTypeDefs(typesArray);
