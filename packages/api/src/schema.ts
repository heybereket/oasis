import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
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
    posts: [Post]
    repos: [Repo]
    activity: [ActivityEvent]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    media: [String]
    tags: [String]
    comments: [Comment]
  }

  type Repo {
    id: ID!
    full_name: String!
    github_owner: String!
    github_name: String!
    github_url: String!
    githubID: ID!
    added_by: User!

    desc: String
    issues: Int
    language: String
    stars: Int
  }

  type ActivityEvent {
    id: ID!
    type: String!
    eventString: String!
    relatedUser: User
    relatedRepo: Repo
  }

  type Comment {
    id: ID!
    author: User!
    content: String!
    likes: Int!
    disLikes: Int!
  }

  type Query {
    getUsers: [User]
    getUser(username: String!): User!

    getRepos: [Repo]
    getRepo(full_name: String!): Repo!
  }
`;
