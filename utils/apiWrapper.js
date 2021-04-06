async function getUser(userName) {
  return await apiFetch('/users/' + userName);
}

async function getUsers() {
  return await apiFetch('/users');
}

async function getRepo(repoName) {
  return await apiFetch('/repos/' + repoName);
}

async function getRepos() {
  return await apiFetch('/repos');
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
};

export default Wrapper;
