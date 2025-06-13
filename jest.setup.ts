import '@testing-library/jest-dom';
process.env.VITE_GITHUB_API = 'https://api.github.com';

Object.defineProperty(global, 'scrollTo', {
  value: () => {},
  writable: true,
});