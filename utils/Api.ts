import axios, { AxiosError } from 'axios';
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
  UserInfoType,
  GetMenuListType,
  SignUpType,
  UserUpdateType,
  CodeRegistType,
  CodeUpdateType,
} from '@typings/global';
import { useToken } from '@store';

interface CustomResponse<ResultType> {
  code: string;
  message: string;
  result: ResultType;
}

export const $axios = axios.create({
  baseURL: process.env.API_URL,
});

export const Api = () => {
  const { token, setToken } = useToken();
  if (token) $axios.defaults.headers.common['Authorization'] = token;

  const modules = {
    async login(email: string, password: string) {
      const response = await $axios.post<CustomResponse<LoginType>>('/user/signin', { email, password });
      const { result } = response.data;

      if (response.data.code === '200') {
        localStorage.setItem('token', result.token);
        localStorage.setItem('menuList', JSON.stringify(result.menuList));
        localStorage.setItem('companyList', JSON.stringify(result.companyList));
        localStorage.setItem('userInfo', JSON.stringify(result.userInfo));
        setToken();
        return;
      }
      alert(response.data.message);
    },
    async logout() {
      localStorage.clear();
      setToken();
    },
    async checkToken() {
      const response = await $axios.get<CustomResponse<any>>('/cmm/check-token');

      if (response.data.code === '441') {
        alert(response.data.message);
        modules.logout();
      }
    },
    async updateTenantData(body: TenantUpdateInput) {
      const response = await $axios.post<CustomResponse<TenantType[]>>('/tenant/update', body);

      if (response.data.code === '200') {
        alert('수정에 성공했습니다.');
        return;
      }
      alert(response.data.message);
    },
    async registTenantData(body: TenantInput) {
      const response = await $axios.post<CustomResponse<TenantType[]>>('/tenant/regist', body);

      if (response.data.code === '200') {
        alert('등록에 성공했습니다.');
        return;
      }
      alert(response.data.message);
    },
    async getTenantData() {
      const companyList = localStorage.getItem('companyList');
      const response = await $axios.post<CustomResponse<TenantType[]>>(
        '/tenant/list',
        companyList ? { companyList: JSON.parse(companyList) } : { companyList: [null] },
      );

      const valid = response.data.code === '200';

      if (valid) {
        const list = response.data.result;
        return { list };
      }
    },
    async updateConsultData(newConsult: UpdateConsultType) {
      const response = await $axios.post<CustomResponse<ConsultType[]>>('/consult/update', newConsult);

      if (response.data.code === '200') alert('수정에 성공했습니다.');
    },
    async registConsultData(newConsult: RegistConsultType) {
      const response = await $axios.post<CustomResponse<ConsultType[]>>('/consult/regist', newConsult);

      if (response.data.code === '200') alert('등록에 성공했습니다.');
    },
    async getConsultData() {
      const response = await $axios.post<CustomResponse<ConsultType[]>>('/consult/list', null);
      const ConsultCodeList = await modules.getCode('CONSULT_STATUS');
      const locationCodeList = await modules.getCode('LOCATION_CODE');

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
    async getCode(code: string) {
      const response = await $axios.get<CustomResponse<CodeType[]>>(`/cmm/code-list/${code}`);

      if (response.data.code === '200') {
        const codeList = response.data.result;
        return codeList;
      }
      alert(response.data.message);
    },
    async getSpotList() {
      const response = await $axios.post<CustomResponse<SpotType[]>>('/spot/list');

      if (response.data.code === '200') {
        const spotList = response.data.result;
        return spotList;
      }
      alert(response.data.message);
    },
    async getRoomList(spotId: number) {
      const response = await $axios.post<CustomResponse<RoomType[]>>('/room/list', { spotId });

      if (response.data.code === '200') {
        const roomList = response.data.result;
        return roomList;
      }
      alert(response.data.message);
    },
    async getUserList() {
      const response = await $axios.post<CustomResponse<UserInfoType[]>>('/user/list');
      if (response.data.code === '200') {
        return response.data.result;
      }
    },
    async getMenuList() {
      const response = await $axios.post<CustomResponse<GetMenuListType[]>>('/code/menu/list');

      if (response.data.code === '200') {
        return response.data.result;
      }
    },
    async signup(body: SignUpType) {
      const response = await $axios.post<CustomResponse<UserInfoType[]>>('/user/signup', body);

      if (response.data.code === '200') {
        alert('사용자 등록에 성공했습니다.');
        return;
      }
      alert(response.data.message);
    },
    async updateUser(body: UserUpdateType) {
      const response = await $axios.post<CustomResponse<UserInfoType[]>>('/user/update', body);
      if (response.data.code === '200') {
        alert('사용자 정보를 수정했습니다.');
      }
    },
    async getAllCodeGroup() {
      const response = await $axios.get<CustomResponse<CodeType[]>>(`/cmm/code-group`);

      if (response.data.code === '200') {
        const codeGroupList = response.data.result.slice(1);
        return codeGroupList;
      }
      alert(response.data.message);
    },
    async registCode(body: CodeRegistType) {
      const response = await $axios.post<CustomResponse<CodeType[]>>('/code/regist', body);

      if (response.data.code === '200') {
        alert('등록에 성공했습니다.');
        return response.data.code;
      }
      alert(response.data.message);
    },
    async deleteCode(code: string) {
      const response = await $axios.post<CustomResponse<CodeType[]>>('/code/delete', { code });

      if (response.data.code === '200') {
        alert('코드를 정상적으로 삭제 했습니다.');
        return;
      }
      alert(response.data.message);
    },
    async updateCode(body: CodeUpdateType) {
      const response = await $axios.post<CustomResponse<CodeType[]>>('/code/update', body);

      if (response.data.code === '200') {
        alert('코드를 수정 했습니다.');
        return;
      }
      alert(response.data.message);
    },
    async getReceiptData() {
      const companyList = localStorage.getItem('companyList');
      const response = await $axios.post<CustomResponse<any[]>>(
        '/receipt/list',
        {
          // baseMonth: 0,
          paymentYn: false,
          companyList: companyList ? JSON.parse(companyList) : [null],
        },
        //   companyList ? { companyList: JSON.parse(companyList) } : { companyList: [null] },
      );

      // const valid = response.data.code === '200';

      // if (valid) {
      //   return response.data.result;
      // }
    },
  };
  return modules;
};
export default Api;
