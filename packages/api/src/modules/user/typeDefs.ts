import { gql } from "apollo-server-micro";

export default gql`
  type User {
    id: ID!
    createdAt: String!
    verified: Boolean
    username: String!
    photoURL: String!
    bio: String
    email: String
    bioLink: String
    name: String
    twitter: String
    posts: [Post]!
    repos: [Repo]!
    # activity: [ActivityEvent]!
  }

  type Query {
    allUsers: [User]!
    getUser(id: ID!): User
  }
`;
