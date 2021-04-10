import useSWR from 'swr';

export async function user(userName) {
//   return await apiFetch('/users/' + userName);
  return {
   "created": {
      "_seconds": 1617891559,
      "_nanoseconds": 596000000
   },
   "twitter": "vishyfishy2",
   "username": "vishy-dev",
   "name": null,
   "joined": "Apr 8, 2021",
   "link": "https://fishystuff.cf",
   "avatar": "https://avatars.githubusercontent.com/u/56125930?v=4",
   "uid": "5mHoLbOid8VLK6xFEKOoPJ57Owq1",
   "verified": false,
   "bio": "I'm working on random, interesting open-source projects!"
};
}

export async function activity(userName, limit = 10) {
//   return await apiFetch('/activity/' + userName + '?limit=' + limit);
  return [];
}

export async function users(limit = 10) {
//   return await apiFetch('/users?limit=' + limit);
  return [];
}

export async function repo(repoName) {
//   return await apiFetch('/repos/' + repoName);
  return {
   "issues": 689,
   "desc": "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
   "name": "react",
   "active": true,
   "id": 10270250,
   "date_added": {
      "_seconds": 1617830280,
      "_nanoseconds": 763000000
   },
   "full_name": "facebook/react",
   "stars": 166556,
   "github_owner": "facebook",
   "language": "JavaScript",
   "added_by": "5mHoLbOid8VLK6xFEKOoPJ57Owq1",
   "url": "https://github.com/facebook/react"
};
}

export async function repos(limit = 10) {
//   return await apiFetch('/repos?limit=' + limit);
  return [];
}

async function apiFetch(route) {
  console.log(`https://${process.env.NEXT_PUBLIC_BASE_API_URL}/api${route}`);
  return await fetch(`https://${process.env.NEXT_PUBLIC_BASE_API_URL}/api${route}`)
    .then(res => res.json())
    .then(json => {
      return json;
    });
}

export function FetchJSON(url) {
  return fetch(url).then(data => data.json());
}

export function Fetch(url) {
  return fetch(url).then(data => data.text());
}

export function SWR(path) {
  return useSWR('/api/' + path, FetchJSON);
}
