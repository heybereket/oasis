import { gql } from "apollo-server-micro";

export default gql`
  type User {
    id: ID!
    joined: String!
    verified: Boolean!
    username: String!
    avatar_url: String!
    bio: String
    email: String
    bioLink: String
    name: String
    twitterLink: String
    # posts: [Post]!
    repos: [Repo]!
    # activity: [ActivityEvent]!
  }

  type Query {
    allUsers: [User]!
    getUser(username: String!): User!
  }
`;
