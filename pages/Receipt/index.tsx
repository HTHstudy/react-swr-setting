import React, { useEffect } from 'react';
import Api from '@utils/Api';
const Receipt = () => {
  const API = Api();
  useEffect(() => {
    API.getReceiptData();
  }, []);
  return <div>정산 탭</div>;
};

export default Receipt;
