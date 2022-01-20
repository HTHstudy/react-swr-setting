import { Button, Chip, Modal } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { UserInfoType } from '@typings/global';
import MaterialTable, { Column } from 'material-table';
import React, { useEffect, useState } from 'react';
import UserRegistForm from './UserRegistForm';
import UserUpdateForm from './UserUpdateForm';
import useUserData, { userInfoRowdata } from './useUserData';

const AdminSettings = () => {
  const classes = useStyles();
  const { userData } = useUserData();
  const [selectedData, setSelectedData] = useState<UserInfoType>();
  const [columns, setColumns] = useState<Column<userInfoRowdata>[]>();

  useEffect(() => {
    if (!userData) return;

    setColumns([
      { title: 'ID', field: 'email', type: 'string', align: 'center' },
      { title: '사용자', field: 'userName', type: 'string', align: 'center' },
      { title: '연락처', field: 'phone', type: 'string', align: 'center' },
      {
        title: '조회가능메뉴',
        field: 'menuList',
        render: (rowData) => {
          const _menuList = rowData.menuList?.split(',');
          return _menuList?.map((menu) => <Chip style={{ margin: 2 }} size="small" label={menu} color="primary" />);
        },
      },
      {
        title: '조회가능지점',
        field: 'compList',
        render: (rowData) => {
          const _compList = rowData.compList?.split(',');
          return _compList?.map((comp) => <Chip style={{ margin: 2 }} size="small" label={comp} color="secondary" />);
        },
      },
      { title: '최종접속일시', field: 'lastAccessDate', type: 'datetime', align: 'center' },
    ]);
  }, [userData]);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
    if (!selectedData) return;
    handleOpen2();
  }, [selectedData]);

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
  return (
    <div>
      <Button onClick={handleOpen} className={classes.addUser} variant="contained" color="primary">
        관리자 생성
      </Button>
      <Modal open={open}>
        <UserRegistForm onClose={handleClose} />
      </Modal>
      {selectedData && (
        <Modal open={open2}>
          <UserUpdateForm rowData={selectedData} onClose={handleClose2} />
        </Modal>
      )}
      {userData && columns && (
        <MaterialTable
          title="관리자 설정"
          columns={columns}
          data={userData}
          options={{
            pageSize: 100,
            pageSizeOptions: [10, 50, 100],
            search: true,
            addRowPosition: 'first',
            toolbarButtonAlignment: 'left',
            searchFieldAlignment: 'left',
          }}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Row',
              onClick: (event, rowData) => {
                setSelectedData(rowData as UserInfoType);
              },
            },
          ]}
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
