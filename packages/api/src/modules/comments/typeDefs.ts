import { gql } from "apollo-server-core";

export default gql`
  type Comment {
    id: ID!
    post: Post!
    author: User!
    content: String!
    likes: Int!
    dislikes: Int!
  }

  type Query {
    allComments: [Comment!]!
    getComment(id: ID!): Comment
  }
`;
