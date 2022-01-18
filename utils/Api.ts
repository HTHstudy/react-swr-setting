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
import { useToken } from '@store';

interface CustomResponse<ResultType> {
  code: string;
  message: string;
  result: ResultType;
}

const $axios = axios.create({
  baseURL: process.env.API_URL,
});

const Api = () => {
  const { setToken } = useToken();
  const token = localStorage.getItem('token');
  if (token) $axios.defaults.headers.common['Authorization'] = token;

  const login = async (email: string, password: string) => {
    const response = await $axios.post<CustomResponse<LoginType>>('/user/signin', { email, password });
    const { result } = response.data;

    if (response.data.code === '200') {
      localStorage.setItem('token', result.token);
      localStorage.setItem('menuList', JSON.stringify(result.menuList));
      localStorage.setItem('companyList', JSON.stringify(result.companyList));
      setToken();
      return;
    }
    alert(response.data.message);
  };
  const logout = async () => {
    localStorage.clear();
    setToken();
  };

  const updateTenantData = async (body: TenantUpdateInput) => {
    const response = await $axios.post<CustomResponse<TenantType[]>>('/tenant/update', body);

    if (response.data.code === '200') {
      alert('수정에 성공했습니다.');
      return;
    }
    alert(response.data.message);
  };
  const registTenantData = async (body: TenantInput) => {
    const response = await $axios.post<CustomResponse<TenantType[]>>('/tenant/regist', body);

    if (response.data.code === '200') {
      alert('등록에 성공했습니다.');
      return;
    }
    alert(response.data.message);
  };
  const getTenantData = async () => {
    const companyList = localStorage.getItem('companyList');
    const response = await $axios.post<CustomResponse<TenantType[]>>(
      '/tenant/list',
      companyList ? { companyList: JSON.parse(companyList) } : { companyList: [null] },
    );

    const spotList = await getSpotList();
    const companyCodeList = await getCode('COMPANY_CODE');

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
  };
  const updateConsultData = async (newConsult: UpdateConsultType) => {
    const response = await $axios.post<CustomResponse<ConsultType[]>>('/consult/update', newConsult);

    if (response.data.code === '200') alert('수정에 성공했습니다.');
  };
  const registConsultData = async (newConsult: RegistConsultType) => {
    const response = await $axios.post<CustomResponse<ConsultType[]>>('/consult/regist', newConsult);

    if (response.data.code === '200') alert('등록에 성공했습니다.');
  };
  const getConsultData = async () => {
    const response = await $axios.post<CustomResponse<ConsultType[]>>('/consult/list', null);
    const ConsultCodeList = await getCode('CONSULT_STATUS');
    const locationCodeList = await getCode('LOCATION_CODE');
    console.log(response);

    if (response.data.code === '441') {
      alert('세션이 만료 되었습니다.');
      logout();
    }

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
  };
  const getCode = async (code: string) => {
    const response = await $axios.get<CustomResponse<CodeType[]>>(`/cmm/code-list/${code}`);

    if (response.data.code === '200') {
      const codeList = response.data.result;
      return codeList;
    }
    alert(response.data.message);
  };
  const getSpotList = async () => {
    const response = await $axios.post<CustomResponse<SpotType[]>>('/spot/list');

    if (response.data.code === '200') {
      const spotList = response.data.result;
      return spotList;
    }
    alert(response.data.message);
  };
  const getRoomList = async (spotId: number) => {
    const response = await $axios.post<CustomResponse<RoomType[]>>('/room/list', { spotId });

    if (response.data.code === '200') {
      const roomList = response.data.result;
      return roomList;
    }
    alert(response.data.message);
  };
  return {
    login,
    logout,
    updateTenantData,
    registTenantData,
    getTenantData,
    updateConsultData,
    registConsultData,
    getConsultData,
    getCode,
    getSpotList,
    getRoomList,
  };
};

export default Api;
