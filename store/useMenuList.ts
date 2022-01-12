import useSWR, { KeyedMutator, useSWRConfig } from 'swr';

import { MenuListType } from '@typings/global';

const NAMESPACE = 'localStorage';
const STATE_KEY = `${NAMESPACE}/menulist`;
const INITIAL_DATA = undefined;

export const useMenuList = (): {
  menuList: MenuListType[];
  setMenuList: KeyedMutator<string | null>;
} => {
  const { data, mutate } = useSWR(STATE_KEY, () => localStorage.getItem('menulist'));
  const { cache } = useSWRConfig();
  if (!cache.get(STATE_KEY)) {
    cache.set(STATE_KEY, INITIAL_DATA);
  }

  return { menuList: data ? JSON.parse(data) : INITIAL_DATA, setMenuList: mutate };
};

export default useMenuList;
