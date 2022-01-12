import axios from 'axios';
import { LoginType, ConsultType, CodeType, RegistConsultType, UpdateConsultType } from '@typings/global';

interface CustomResponse<ResultType> {
  code: string;
  message: string;
  result: ResultType;
}

const $axios = axios.create({
  baseURL: process.env.API_URL,
});

const Api = {
  login: async (email: string, password: string) => {
    const response = await $axios.post<CustomResponse<LoginType>>('/user/signin', { email, password });
    const { result } = response.data;
    console.log(response);

    if (response.data.code === '200') {
      localStorage.setItem('token', result.token);
      localStorage.setItem('menulist', JSON.stringify(result.menuList));

      return response;
    }
    alert(response.data.message);
  },
  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('menulist');
  },

  getTenantData: async (companyList: string) => {
    const token = localStorage.getItem('token');
    if (token) $axios.defaults.headers.common['Authorization'] = token;
    const response = await $axios.post<CustomResponse<any[]>>('/tenant/list', { companyList });
    console.log(response);
    // const ConsultCodeList = await Api.getCode('CONSULT_STATUS');
    // const locationCodeList = await Api.getCode('LOCATION_CODE');

    // const valid = response.data.code === '200' && locationCodeList && ConsultCodeList;

    // if (valid) {
    //   const list = response.data.result;

    //   const consultLookup: { [s: string]: string } = {};
    //   ConsultCodeList?.forEach((consult) => {
    //     consultLookup[consult.code] = consult.codeName;
    //   });
    //   const locationLookup: { [s: string]: string } = {};
    //   locationCodeList?.forEach((location) => {
    //     locationLookup[location.code] = location.codeName;
    //   });

    //   return { list, consultLookup, locationLookup };
    // }
  },

  updateConsultData: async (newConsult: UpdateConsultType) => {
    console.log(newConsult);
    const token = localStorage.getItem('token');
    if (token) $axios.defaults.headers.common['Authorization'] = token;
    const response = await $axios.post<CustomResponse<ConsultType[]>>('/consult/update', newConsult);

    if (response.data.code === '200') alert('수정에 성공했습니다.');
  },
  registConsultData: async (newConsult: RegistConsultType) => {
    const token = localStorage.getItem('token');
    if (token) $axios.defaults.headers.common['Authorization'] = token;
    const response = await $axios.post<CustomResponse<ConsultType[]>>('/consult/regist', newConsult);

    if (response.data.code === '200') alert('등록에 성공했습니다.');
  },
  getConsultData: async () => {
    const token = localStorage.getItem('token');
    if (token) $axios.defaults.headers.common['Authorization'] = token;
    const response = await $axios.post<CustomResponse<ConsultType[]>>('/consult/list', null);
    const ConsultCodeList = await Api.getCode('CONSULT_STATUS');
    const locationCodeList = await Api.getCode('LOCATION_CODE');

    const valid = response.data.code === '200' && locationCodeList && ConsultCodeList;

    if (valid) {
      const list = response.data.result;

      const consultLookup: { [s: string]: string } = {};
      ConsultCodeList?.forEach((consult) => {
        consultLookup[consult.code] = consult.codeName;
      });
      const locationLookup: { [s: string]: string } = {};
      locationCodeList?.forEach((location) => {
        locationLookup[location.code] = location.codeName;
      });

      return { list, consultLookup, locationLookup };
    }
  },
  getCode: async (code: string) => {
    const response = await $axios.get<CustomResponse<CodeType[]>>(`/cmm/code-list/${code}`);

    if (response.data.code === '200') {
      const codeList = response.data.result;
      return codeList;
    }
    alert('error');
  },
};

export default Api;
