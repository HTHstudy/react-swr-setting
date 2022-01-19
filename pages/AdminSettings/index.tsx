import { Button, Modal } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { userInfoType } from '@typings/global';
import MaterialTable, { Column } from 'material-table';
import React, { useEffect, useState } from 'react';
import UserRegistForm from './UserRegistForm';
import useUserData from './useUserData';

const AdminSettings = () => {
  const classes = useStyles();
  const { userData } = useUserData();
  console.log(userData);
  const columns: Column<userInfoType>[] = [
    { title: 'ID', field: 'email', type: 'string', align: 'center' },
    { title: '사용자', field: 'userName', type: 'string', align: 'center' },
    { title: '조회가능지점', field: 'compList', align: 'center', render: (rowData) => <span>{rowData.compList}</span> },
    { title: '조회가능메뉴', field: 'menuList', align: 'center', render: (rowData) => <span>{rowData.menuList}</span> },
    { title: '최종접속일시', field: 'lastAccessDate', type: 'datetime', align: 'center' },
  ];
  const [open, setOpen] = useState(false);
  // const [open2, setOpen2] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleOpen} className={classes.addUser} variant="contained" color="primary">
        관리자 생성
      </Button>
      <Modal open={open}>
        <UserRegistForm onClose={handleClose} />
      </Modal>
      {userData && (
        <MaterialTable
          title="관리자 설정"
          columns={columns}
          data={userData}
          options={{
            pageSize: 100,
            pageSizeOptions: [10, 50, 100],
            search: true,
            exportButton: true,
            addRowPosition: 'first',
            toolbarButtonAlignment: 'left',
            searchFieldAlignment: 'left',
          }}
          // actions={[
          //   {
          //     icon: 'edit',
          //     tooltip: 'Edit Row',
          //     onClick: (event, rowData) => {
          //       setSelectedData(rowData as TenantType);
          //     },
          //   },
          // ]}
        />
      )}
    </div>
  );
};

export default AdminSettings;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addUser: {
      fontSize: 16,
      marginBottom: '16px',
    },
  }),
);
