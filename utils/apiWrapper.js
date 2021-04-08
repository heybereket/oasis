async function getUser(userName) {
  return await apiFetch('/users/' + userName);
}

async function getFeed(userName, limit = 10) {
  return await apiFetch('/activity/' + userName + '?limit=' + limit);
}

async function getUsers(limit = 10) {
  return await apiFetch('/users?limit=' + limit);
}

async function getRepo(repoName) {
  return await apiFetch('/repos/' + repoName);
}

async function getRepos(limit = 10) {
  return await apiFetch('/repos?limit=' + limit);
}

async function apiFetch(route) {
  return await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + route)
    .then(res => res.json())
    .then(json => {
      return json;
    });
}

const Wrapper = {
  user: getUser,
  users: getUsers,
  repo: getRepo,
  repos: getRepos,
  feed: getFeed,
};

export default Wrapper;
