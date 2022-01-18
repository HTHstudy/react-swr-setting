import React, { useEffect, useState } from 'react';
import MaterialTable, { Column } from 'material-table';
import useTenantData, { TenantRowdata } from './useTenantData';
import { Button, Modal } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TenantRegistForm from './TenantRegistForm';
import TenantUpdateForm from './TenantUpdateForm';
import { TenantType } from '@typings/global';

const ContractManagement = () => {
  const classes = useStyles();
  const { tenantData } = useTenantData();
  const [columns, setColumns] = useState<Column<TenantRowdata>[]>();

  const [selectedData, setSelectedData] = useState<TenantType>();

  useEffect(() => {
    if (!selectedData) return;
    handleOpen2();
  }, [selectedData]);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    setSelectedData(undefined);
  };

  useEffect(() => {
    if (!tenantData) return;

    setColumns([
      { title: '이름', field: 'userName', type: 'string', align: 'center' },
      { title: '휴대폰', field: 'phone', type: 'string', align: 'center' },
      { title: '지점', field: 'spotName', type: 'string', align: 'center' },
      { title: '호수', field: 'roomName', type: 'string', align: 'center' },
      { title: '시작일', field: 'startDate', type: 'date', align: 'center' },
      { title: '만료일', field: 'endDate', type: 'date', align: 'center' },
      { title: '업체', field: 'companyName', type: 'string', align: 'center' },
      { title: '월세', field: 'monthlyFee', type: 'numeric', align: 'center' },
      { title: '연장개월', field: 'extendMonth', type: 'numeric', align: 'center' },
      { title: '입금일자', field: 'lastPayDay', type: 'date', align: 'center' },
      { title: '납부액', field: 'payment', type: 'numeric', align: 'center' },
      { title: '결제수단', field: 'paymentTypeName', type: 'string', align: 'center' },
      { title: '사업자번호', field: 'identify', type: 'string', align: 'center' },
      { title: '사업자명', field: 'businessName', type: 'string', align: 'center' },
      { title: '이메일', field: 'taxBillEmail', type: 'string', align: 'center' },
      { title: '계약갱신일', field: 'renewalDate', type: 'date', align: 'center' },
    ]);
  }, [tenantData]);

  return (
    <div style={{ width: '180vw' }}>
      <Button onClick={handleOpen} className={classes.addTenant} variant="contained" color="primary">
        계약 생성
      </Button>
      <Modal open={open}>
        <TenantRegistForm onClose={handleClose} />
      </Modal>
      {selectedData && (
        <Modal open={open2}>
          <TenantUpdateForm rowData={selectedData} onClose={handleClose2} />
        </Modal>
      )}
      {tenantData && columns && (
        <MaterialTable
          title="계약 테이블"
          columns={columns}
          data={tenantData.list}
          options={{
            pageSize: 100,
            pageSizeOptions: [10, 50, 100],
            search: true,
            exportButton: true,
            addRowPosition: 'first',
            toolbarButtonAlignment: 'left',
            searchFieldAlignment: 'left',
          }}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Row',
              onClick: (event, rowData) => {
                setSelectedData(rowData as TenantType);
              },
            },
          ]}
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
  }),
);
