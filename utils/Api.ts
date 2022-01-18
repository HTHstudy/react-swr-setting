import axios from 'axios';
import {
  LoginType,
  ConsultType,
  CodeType,
  RegistConsultType,
  UpdateConsultType,
  TenantType,
  SpotType,
  RoomType,
  TenantInput,
  TenantUpdateInput,
} from '@typings/global';

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

    if (response.data.code === '200') {
      localStorage.setItem('token', result.token);
      localStorage.setItem('menuList', JSON.stringify(result.menuList));
      localStorage.setItem('companyList', JSON.stringify(result.companyList));

      return response;
    }
    alert(response.data.message);
  },
  logout: async () => {
    localStorage.clear();
  },
  addToken: () => {
    const token = localStorage.getItem('token');
    if (token) $axios.defaults.headers.common['Authorization'] = token;
  },
  updateTenantData: async (body: TenantUpdateInput) => {
    Api.addToken();
    const response = await $axios.post<CustomResponse<TenantType[]>>('/tenant/update', body);

    if (response.data.code === '200') {
      alert('수정에 성공했습니다.');
      return;
    }
    alert(response.data.message);
  },
  registTenantData: async (body: TenantInput) => {
    Api.addToken();
    const response = await $axios.post<CustomResponse<TenantType[]>>('/tenant/regist', body);

    if (response.data.code === '200') {
      alert('등록에 성공했습니다.');
      return;
    }
    alert(response.data.message);
  },
  getTenantData: async () => {
    Api.addToken();
    const companyList = localStorage.getItem('companyList');
    const response = await $axios.post<CustomResponse<TenantType[]>>(
      '/tenant/list',
      companyList ? { companyList: JSON.parse(companyList) } : { companyList: [null] },
    );

    const spotList = await Api.getSpotList();
    const companyCodeList = await Api.getCode('COMPANY_CODE');

    const valid = response.data.code === '200' && spotList && companyCodeList;

    if (valid) {
      const list = response.data.result;
      const spotLookup: { [s: string]: string } = {};
      spotList.forEach((spot) => {
        spotLookup[spot.spotId] = spot.spotName;
      });
      const companyLookup: { [s: string]: string } = {};
      companyCodeList.forEach((company) => {
        companyLookup[company.code] = company.codeName;
      });

      return { list, spotLookup, companyLookup };
    }
  },
  updateConsultData: async (newConsult: UpdateConsultType) => {
    Api.addToken();
    const response = await $axios.post<CustomResponse<ConsultType[]>>('/consult/update', newConsult);

    if (response.data.code === '200') alert('수정에 성공했습니다.');
  },
  registConsultData: async (newConsult: RegistConsultType) => {
    Api.addToken();
    const response = await $axios.post<CustomResponse<ConsultType[]>>('/consult/regist', newConsult);

    if (response.data.code === '200') alert('등록에 성공했습니다.');
  },
  getConsultData: async () => {
    Api.addToken();
    const response = await $axios.post<CustomResponse<ConsultType[]>>('/consult/list', null);
    const ConsultCodeList = await Api.getCode('CONSULT_STATUS');
    const locationCodeList = await Api.getCode('LOCATION_CODE');
    console.log(response);

    // if (response.data.code === '441') {
    //   alert('세션이 만료 되었습니다.');
    //   Api.logout();
    // }

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
    alert(response.data.message);
  },
  getSpotList: async () => {
    const response = await $axios.post<CustomResponse<SpotType[]>>('/spot/list');

    if (response.data.code === '200') {
      const spotList = response.data.result;
      return spotList;
    }
    alert(response.data.message);
  },
  getRoomList: async (spotId: number) => {
    const response = await $axios.post<CustomResponse<RoomType[]>>('/room/list', { spotId });

    if (response.data.code === '200') {
      const roomList = response.data.result;
      return roomList;
    }
    alert(response.data.message);
  },
};

export default Api;
