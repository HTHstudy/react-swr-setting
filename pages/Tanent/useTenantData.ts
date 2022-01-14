import useSWR from 'swr';
import { TenantType } from '@typings/global';
import Api from '@utils/Api';

export interface TableData {
  id: number;
  editing: any;
}
export interface TenantRowdata extends TenantType {
  tableData?: TableData;
}

function useTenantData() {
  const { data, error, mutate } = useSWR(`/api/tenant`, Api.getTenantData);

  return {
    tenantData: data,
    isLoading: !error && !data,
    isError: error,
    setTenantData: mutate,
  };
}

export default useTenantData;
