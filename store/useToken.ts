import useSWR, { useSWRConfig } from 'swr';

const NAMESPACE = 'localStorage';
const STATE_KEY = `${NAMESPACE}/token`;
const INITIAL_DATA = undefined;

export const useToken = () => {
  const { data, mutate } = useSWR(STATE_KEY, () => localStorage.getItem('token'));
  const { cache } = useSWRConfig();
  if (!cache.get(STATE_KEY)) {
    cache.set(STATE_KEY, INITIAL_DATA);
  }

  return { token: data || INITIAL_DATA, setToken: mutate };
};

export default useToken;
