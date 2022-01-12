import useSWR from 'swr';
import { ConsultType } from '@typings/global';
import Api from '@utils/Api';

export interface TableData {
  id: number;
  editing: any;
}
export interface ConsultRowdata extends ConsultType {
  tableData?: TableData;
}

function useConsultData() {
  const { data, error, mutate } = useSWR(`/api/consult`, Api.getConsultData);

  return {
    consultData: data,
    isLoading: !error && !data,
    isError: error,
    setConsultData: mutate,
  };
}

export default useConsultData;
