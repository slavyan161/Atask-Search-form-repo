// using condition for handler jest Environment Variable
const BASE_URL = 'https://api.github.com';

export const searchUsers = async (query: string, limit = 6) => {
  const response = await fetch(`${BASE_URL}/search/users?q=${query}&per_page=${limit}`);
  if (!response.ok) throw new Error('Failed to search users');
  const data = await response.json();
  return data.items ?? [];
};

export const fetchUserRepos = async (reposUrl: string) => {
  const response = await fetch(reposUrl);
  if (!response.ok) throw new Error('Failed to fetch repos');
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};