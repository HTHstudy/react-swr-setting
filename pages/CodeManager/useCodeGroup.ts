import useSWR from 'swr';
import { CodeType } from '@typings/global';
import Api from '@utils/Api';

export interface TableData {
  id: number;
  editing: any;
}
export interface CodeGroupRowdata extends CodeType {
  tableData?: TableData;
}

function useCodeGroup() {
  const API = Api();
  const { data, error, mutate } = useSWR(`/api/code-group`, API.getAllCodeGroup);

  return {
    codeGroupList: data,
    isLoading: !error && !data,
    isError: error,
    setCodeGroupList: mutate,
  };
}

export default useCodeGroup;
