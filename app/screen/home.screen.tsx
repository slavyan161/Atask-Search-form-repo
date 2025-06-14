import React, { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ButtonComponent } from '~/components/button/button.component';
import { AnimatePresence, motion } from 'framer-motion';
import { fetchUserRepos, searchUsers } from '~/api/github.api';
import type { TGithubRepo, TGithubUser } from '~/types/github.types';
import { InputComponent } from '~/components/input/input.component';
import { CardComponent } from '~/components/card/card.component';
import { CardSkeletonComponent } from '~/components/card/card-skeleton.component';

type FormValues = {
  query: string;
};

export function HomeScreen() {
  const limitUser = 6;
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const query = watch('query');

  const [users, setUsers] = useState<TGithubUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [repos, setRepos] = useState<TGithubRepo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isItemLoading, setIsItemLoading] = useState<boolean>(false);
  const [tempSelectedUser, setTempSelectedUser] = useState<string | null>(null);

  const onSubmit = useCallback(async (data: FormValues) => {
    setIsLoading(true);
    setSelectedUser(null);
    setRepos([]);

    if (!data.query) {
      setIsLoading(false);
      return;
    }

    try {
      const jsonResponse = await searchUsers(data.query, limitUser);
      if (jsonResponse?.length) {
        setUsers(jsonResponse);
      } else {
        console.warn('No users found for the given query.');
        setUsers([]);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }

    setIsLoading(false);
  }, []);

  const handleUserSelect = useCallback(async (user: any) => {
    const loginUsername = user.login;
    const reposUrl = user.repos_url;

    if (tempSelectedUser && tempSelectedUser === loginUsername) {
      setSelectedUser((prev) => (prev === loginUsername ? null : loginUsername));
      return;
    } else {
      setTempSelectedUser(null);
    }

    // Set the selected user and start loading repos
    // Set Selected User First to trigger Memoization and UI updates
    setSelectedUser(loginUsername);
    setIsItemLoading(true);

    try {
      const data: TGithubRepo[] = await fetchUserRepos(reposUrl);
      setRepos(data);
    } catch (error) {
      console.error('Error fetching repos:', error);
      setRepos([]);
    }

    setTempSelectedUser(loginUsername);
    setIsItemLoading(false);
  }, [tempSelectedUser]);

  // Memoize the active users to avoid unnecessary re-renders
  // This will ensure that the active state is correctly applied to the selected user
  // and that the component only re-renders when the users or selectedUser changes
  // This is useful for performance optimization in larger lists
  // and to prevent unnecessary re-renders of the user list items
  // This will also help in maintaining the active state of the user when the repos are being fetched
  // and to ensure that the UI reflects the correct active user
  // This will also help in maintaining the active state of the user when the repos are being fetched
  const activeUsers = useMemo(() => {
    const activeUsers = users.map((user: any) => ({
      ...user,
      isActive: selectedUser === user.login,
    }));

    return activeUsers;
  }, [users, selectedUser, repos]);

  return (
    <div className="flex p-4 gap-4 min-h-screen font-sans container mx-auto justify-center">
      <div className="bg-white p-4 shadow w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputComponent
            {...register('query')}
            onEnter={() => {
              handleSubmit(onSubmit)();
            }}
          />

          <ButtonComponent
            dataTestId='search-button'
            label="Search"
            type="submit"
            isLoading={isLoading}
            isUseLabelLoading={true}
            suffixLoadingSpinnerColor='text-white'
          />
        </form>

        <div>
          {query && (
            <p className="text-sm text-gray-600 mt-3 mb-2">
              Showing users for "{query}"
            </p>
          )}
          <div className="mt-4">
            {activeUsers.map((user: any) => (
              <div key={user.login} className="mb-2">
                <ButtonComponent
                  dataTestId='user-detail-button'
                  label={user.login}
                  onClick={() => {
                    handleUserSelect(user)
                  }}
                  isLoading={isItemLoading && user.isActive}
                  className="w-full border px-2 py-1 flex justify-between items-center bg-white hover:bg-gray-50"
                  suffix={
                    <i
                      className={`transition-transform duration-300 fi ${user.isActive ? 'fi-rs-angle-small-up' : 'fi-rs-angle-small-down'
                        } text-md`}
                    />
                  }
                  isSuffixWithLoading={true}
                  isUseLabelLoading={false}
                  disabled={isItemLoading}
                  suffixLoadingSpinnerColor='text-blue-500'
                />


                <AnimatePresence initial={false}>
                  {user.isActive && (
                    <motion.div
                      key={user.login}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2">
                        {repos.map((repo: any) => (
                          !isItemLoading ? (
                            <CardComponent key={repo.id} keyId={repo.id} description={repo.description} title={repo.name} score={repo.stargazers_count} />
                          ) : <CardSkeletonComponent />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
