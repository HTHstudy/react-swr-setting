import React, { useEffect, useState } from 'react';
import MaterialTable, { Column } from 'material-table';
import useTenantData, { TenantRowdata } from './useTenantData';
import { Button, Modal } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TenantRegistForm from './TenantRegistForm';

const ContractManagement = () => {
  const classes = useStyles();
  const { tenantData, setTenantData } = useTenantData();
  const [columns, setColumns] = useState<Column<TenantRowdata>[]>();

  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!tenantData) return;
    const { spotLookup, companyLookup } = tenantData;

    setColumns([
      { title: '이름', field: 'userName', type: 'string' },
      { title: '휴대폰', field: 'phone', type: 'string' },
      { title: '지점', field: 'spotId', lookup: spotLookup },
      { title: '호수', field: 'roomName', type: 'string' },
      { title: '시작일', field: 'startDate', type: 'date' },
      { title: '만료일', field: 'endDate', type: 'date' },
      { title: '업체', field: 'companyCode', lookup: companyLookup },
      { title: '월세', field: 'monthlyFee', type: 'numeric' },
      { title: '사업자번호', field: 'identify', type: 'string' },
      { title: '사업자명', field: 'businessName', type: 'string' },
      { title: '이메일', field: 'taxBillEmail', type: 'string' },
      { title: '계약갱신일', field: 'renewalDate', type: 'date' },
      { title: '입금일자', field: 'lastPayDay', type: 'date' },
    ]);
  }, [tenantData]);

  return (
    <div style={{ width: '200vw' }}>
      <Button onClick={handleOpen} className={classes.addTenant} variant="contained" color="primary">
        계약 생성
      </Button>
      <Modal open={open} onClose={handleClose}>
        {/* <Modal open={open} > */}
        <TenantRegistForm />
      </Modal>
      {tenantData && columns && (
        <MaterialTable
          title="계약 테이블"
          columns={columns}
          data={tenantData.list}
          options={{
            selection: true,
            pageSize: 100,
            pageSizeOptions: [10, 50, 100],
            search: true,
            exportButton: true,
            addRowPosition: 'first',
            toolbarButtonAlignment: 'left',
            searchFieldAlignment: 'left',
          }}
        />
      )}
    </div>
  );
};

export default ContractManagement;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addTenant: {
      fontSize: 16,
      marginBottom: '16px',
    },
    modalBody: {
      position: 'absolute',
      width: 800,
      height: 600,
      backgroundColor: '#fff',
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
    },
  }),
);
