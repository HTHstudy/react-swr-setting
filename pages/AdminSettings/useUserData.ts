import useSWR from 'swr';
import { UserInfoType } from '@typings/global';
import Api from '@utils/Api';

export interface TableData {
  id: number;
  editing: any;
}
export interface userInfoRowdata extends UserInfoType {
  tableData?: TableData;
}

function useUserData() {
  const API = Api();
  const { data, error, mutate } = useSWR(`/api/user`, API.getUserList);

  return {
    userData: data,
    isLoading: !error && !data,
    isError: error,
    setUserData: mutate,
  };
}

export default useUserData;
