import useSWR, { useSWRConfig } from 'swr';

const NAMESPACE = 'main';
const STATE_KEY = `${NAMESPACE}/text`;
const INITIAL_DATA = 'Default Text';

export const useText = () => {
  const { data, mutate } = useSWR<string>(STATE_KEY, null);
  const { cache } = useSWRConfig();
  if (!cache.get(STATE_KEY)) {
    cache.set(STATE_KEY, INITIAL_DATA);
  }

  return { text: data || INITIAL_DATA, setText: mutate };
};

export default useText;
