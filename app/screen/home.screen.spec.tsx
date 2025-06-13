import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HomeScreen } from './home.screen';
import * as githubApi from '~/api/github.api';

jest.mock('~/api/github.api');

describe('HomeScreen', () => {
  const mockUsers = [
    {
      login: 'testuser',
      id: 1,
      repos_url: 'https://api.github.com/users/testuser/repos',
    },
  ];

  const mockRepos = [
    {
      id: 101,
      name: 'repo-one',
      description: 'A great repo',
      stargazers_count: 42,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (githubApi.searchUsers as jest.Mock).mockResolvedValue(mockUsers);
    (githubApi.fetchUserRepos as jest.Mock).mockResolvedValue(mockRepos);
  });

  it('renders input and button with correct attributes', () => {
    render(<HomeScreen />);
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toHaveTextContent(/search/i);
  });

  it('allows user to type in input', async () => {
    render(<HomeScreen />);
    const input = screen.getByPlaceholderText(/enter username/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    await waitFor(() => {
      expect(input.value).toBe('test');
    })
  });

  it('calls searchUsers and displays user button after clicking search', async () => {
    render(<HomeScreen />);
    const input = screen.getByPlaceholderText(/enter username/i);
    const button = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(githubApi.searchUsers).toHaveBeenCalledWith('test', 6);
      expect(screen.getByTestId('user-detail-button')).toHaveTextContent(/testuser/i);
    });
  });

  it('calls fetchUserRepos and shows repos when user is clicked', async () => {
    render(<HomeScreen />);
    const input = screen.getByPlaceholderText(/enter username/i);
    const button = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);

    const userButton = await screen.findByTestId('user-detail-button');
    fireEvent.click(userButton);

    await waitFor(() => {
      expect(githubApi.fetchUserRepos).toHaveBeenCalledWith(mockUsers[0].repos_url);
      expect(screen.getByText(/repo-one/i)).toBeInTheDocument();
      expect(screen.getByText(/a great repo/i)).toBeInTheDocument();
      expect(screen.getByText('⭐')).toBeInTheDocument();
    });
  });
});
