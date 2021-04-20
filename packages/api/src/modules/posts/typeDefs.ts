import { gql } from "apollo-server-core";

export default gql`
  type Post {
    id: ID!
    title: String!
    message: String!
    # media: [String]
    topics: [String!]!
    comments: [Comment!]!
    likes: [String!]!
    author: User!
  }

  type Query {
    allPosts: [Post!]!
    getPost(id: ID!): Post
  }
`;
