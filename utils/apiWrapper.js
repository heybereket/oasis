import useSWR from 'swr';

export async function user(userName) {
  return await apiFetch('/users/' + userName);
}

export async function activity(userName, limit = 10) {
  return await apiFetch('/activity/' + userName + '?limit=' + limit);
}

export async function users(limit = 10) {
  return await apiFetch('/users?limit=' + limit);
}

export async function repo(repoName) {
  return await apiFetch('/repos/' + repoName);
}

export async function repos(limit = 10) {
  return await apiFetch('/repos?limit=' + limit);
}

async function apiFetch(route) {
  return await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + route)
    .then(res => res.json())
    .then(json => {
      return json;
    });
}

export function SWR(path) {
  const fetcher = url => fetch(url).then(data => data.json());
  return useSWR('/api/' + path, fetcher);
}
