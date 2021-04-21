# The API Roadmap

### Why did you create this roadmap anyway?

I felt that people needed to see exactly what's planned for the api, so that they do not ask about stuff that is going to be implemented in the future.

- [x] Create a boilerplate GraphQL API with `apollo-server-micro`
- [ ] Add queries for `posts` and `comments`
  - [x] Basic Implementation 
  - [x] Connect the 2 with GraphQL
  - [ ] Change code to work with Firebase Database References
- [ ] Add queries for `user` and `repos`
  - [x] Add `allUsers`, `getUser`, `allRepos`, `getRepos` queries
  - [ ] Connect the 2 with GraphQL (directly with Firebase DB Refs this time)
- [ ] Add rate limiting
- [ ] Add mutations
  - [ ] Posts
  - [ ] Comments
  - [ ] Repos
  - [ ] Users
- [ ] Pagination for the `all(...)` fields, I'm choosing to do this after they have already been implemented


### More may come soon
