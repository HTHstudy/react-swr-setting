export interface LoginType {
  token: string;
  userInfo: {
    userName: string;
    phone: string;
    email: string;
  };
  menuList: MenuListType;
  companyList: string[];
}
export interface MenuListType {
  menuName: string;
  menuUrl: string;
}

export interface ConsultType {
  consultId: number;
  content: string;
  email: string | null;
  locationName: string;
  phone: string;
  registDate: string;
  status: string;
  statusName: string;
  userName: string;
  wishSpot: string;
  locationList: string;
}
export interface CodeType {
  code: string;
  codeName: string;
  codeGroup: string;
  codeRemarks: string | null;
}
export interface RegistConsultType {
  wishSpot: string;
  userName: string;
  phone: string;
  content: string;
}
export interface UpdateConsultType {
  consultId: number;
  status: string;
  wishSpot?: string;
  userName?: string;
  phone?: string;
  content?: string;
}

export interface TenantType {
  // businessType: null;
  // status: string;
  companyCode: string;
  tenantId: number;
  spotId: number;
  roomId: number;
  monthlyFee: number;
  area: string;
  startDate: string;
  endDate: number;
  payment: number;
  paymentType: string;
  account: number;
  userName: string;
  identify: string;
  address: number;
  phone: string;
  tenantDate: string;
  useYn: boolean;
  lastPayDay: string;
  tenantPath: string;
  registrationPath: number;
  funnel: string;
  remark: string;
  businessName: string;
  taxBillEmail: string;
  content: string;
  renewalDate: string;
  extendMonth: number;
  statusName: string;
  paymentTypeName: string;
  roomName: string;
  spotName: string;
  companyName: string;
}

export interface TenantInput {
  spotId: number; //지점 번호
  roomId: number; //호수 번호
  monthlyFee: number; //월 이용료
  startDate: string; //계약 시작일
  endDate?: number; //계약 만료일
  payment?: number; //결제 금액
  paymentType: string; //결제 방법
  account?: number; //결제 계좌번호
  userName?: string; //성명
  identify?: string; //사업자 번호
  phone: string; //전화번호
  lastPayDay?: string; //마지막 결제일
  remark?: string; //비고
  businessName?: string; //사업체 명
  taxBillEmail?: string; //세금계산서 이메일
  content?: string; //내용
  renewalDate?: string; //계약 갱신일
  extendMonth: number; //연장 계약
  companyCode: string; // 담당 업체
}
export interface TenantUpdateInput extends TenantInput {
  tenantId: number;
}

export interface SpotType {
  spotId: number;
  spotName: string;
}
export interface RoomType {
  roomId: number;
  roomName: string;
}

export interface UserInfoType {
  compList: string;
  email: string;
  lastAccessDate: string;
  menuList: string;
  userId: number;
  userName: string;
  phone: string;
}

export interface GetMenuListType {
  menuName: string;
  menuId: number;
}

export interface SignUpType {
  email: string;
  userName: string;
  password: string;
  phone: string;
  menuList: number[];
  compList: string[];
}
export interface UserUpdateType {
  email: string;
  userName?: string;
  password?: string;
  phone?: string;
  menuList: number[];
  compList: string[];
}
