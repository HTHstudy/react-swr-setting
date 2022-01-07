import useSWR, { useSWRConfig } from 'swr';

const NAMESPACE = 'main';
const STATE_KEY = `${NAMESPACE}/count2`;
const INITIAL_DATA = 99;

export const useCounter2 = () => {
  const { data, mutate } = useSWR<number>(STATE_KEY, null);
  const { cache } = useSWRConfig();
  if (!cache.get(STATE_KEY)) {
    cache.set(STATE_KEY, INITIAL_DATA);
  }

  return { count2: data || INITIAL_DATA, setCount2: mutate };
};
