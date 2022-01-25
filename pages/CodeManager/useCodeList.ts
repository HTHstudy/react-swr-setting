import useSWR from 'swr';
import { CodeType } from '@typings/global';
import Api from '@utils/Api';
import { useEffect, useState } from 'react';

type CodeListFetcherProps = {
  code: string;
  getCode: (code: string) => Promise<CodeType[] | undefined>;
};
const fetcher = async (props: CodeListFetcherProps) => {
  const { code, getCode } = props;
  const result = getCode(code);
  return result;
};

function useCodeList(codeGroup: string) {
  const API = Api();
  const [code, setCode] = useState('');
  const paramData = { code, getCode: API.getCode };
  useEffect(() => {
    setCode(codeGroup);
  }, [codeGroup]);

  const { data, error, mutate } = useSWR(['/api/codeList/', code], () => fetcher(paramData));

  return {
    codeList: data,
    isLoading: !error && !data,
    isError: error,
    setCodeList: mutate,
  };
}

export default useCodeList;
