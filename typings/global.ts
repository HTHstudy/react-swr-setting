export interface LoginType {
  token: string;
  userInfo: {
    userName: string;
    phone: string;
    email: string;
  };
  menuList: MenuListType;
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
  // companyCode: string;
  // status: string;

  tenantId: number;
  spotId: number;
  roomId: string;
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
