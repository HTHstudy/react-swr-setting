import useSWR, { useSWRConfig } from 'swr';

const NAMESPACE = 'main';
const STATE_KEY = `${NAMESPACE}/count`;
const INITIAL_DATA = 0;

export const useCounter = () => {
  const { data, mutate } = useSWR<number>(STATE_KEY, null);
  const { cache } = useSWRConfig();
  if (!cache.get(STATE_KEY)) {
    cache.set(STATE_KEY, INITIAL_DATA);
  }

  return { count: data || INITIAL_DATA, setCount: mutate };
};
