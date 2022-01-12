import React, { useState } from 'react';
import MaterialTable, { Column } from 'material-table';
import useTenantData from './useTenantData';

const ContractManagement = () => {
  const { tenantData, setTenantData } = useTenantData();
  // console.log(tenantData);

  return <div>계약 관리</div>;
};

export default ContractManagement;
