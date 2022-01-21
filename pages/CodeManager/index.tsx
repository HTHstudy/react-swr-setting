import {
  Box,
  CircularProgress,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from '@material-ui/core';
import { CodeType } from '@typings/global';
import Api from '@utils/Api';
import MaterialTable, { Column } from 'material-table';
import React, { useEffect, useState } from 'react';
import useCodeGroup, { CodeGroupRowdata } from './useCodeGroup';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';

const CodeManager = () => {
  const classes = useStyles();
  const [codeGroupList, setCodeGroupList] = useState<CodeType[]>();
  const API = Api();

  const [value, setValue] = useState(0);
  // const [columns, setColumns] = useState<Column<CodeGroupRowdata>[]>();
  const [columns, setColumns] = useState<GridColDef[]>();
  const [codeList, setCodeList] = useState<CodeType[]>();

  useEffect(() => {
    API.getAllCodeGroup().then((res) => setCodeGroupList(res));
  }, []);
  useEffect(() => {
    if (!codeGroupList) return;
    if (columns) return;
    setColumns([
      { headerName: '코드', field: 'code', type: 'string', width: 200 },
      { headerName: '코드명', field: 'codeName', type: 'string', width: 200 },
      { headerName: '코드그룹', field: 'codeGroup', type: 'string', width: 200 },
      { headerName: '비고', field: 'codeRemarks', type: 'string', width: 200 },
    ]);
    // setColumns([
    //   { title: '코드', field: 'code', type: 'string' },
    //   { title: '코드명', field: 'codeName', type: 'string' },
    //   { title: '코드그룹', field: 'codeGroup', type: 'string' },
    //   { title: '비고', field: 'codeRemarks', type: 'string' },
    // ]);
  }, [codeGroupList]);

  useEffect(() => {
    if (!codeGroupList) return;
    getListByCode(codeGroupList[value].code);
  }, [value, codeGroupList]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (value == newValue) return;
    setValue(newValue);
    setCodeList(undefined);
  };

  const getListByCode = async (codeCroup: string) => {
    const codeList = await API.getCode(codeCroup);
    if (codeList) {
      const temp: any = codeList.slice();
      codeList.forEach((code, index) => {
        temp[index].id = index;
      });
    }

    setCodeList(codeList);
  };
  // const [pageSize, setPageSize] = React.useState<number>(5);

  return (
    <div>
      코드관리123
      <Box>
        <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="simple tabs example">
          {codeGroupList?.map((code, index) => (
            <Tab style={{ backgroundColor: '#79DCE4' }} label={code.codeName} />
          ))}
        </Tabs>

        <div style={{ height: 400, width: '100%' }}>
          {columns && codeList && (
            <DataGrid
              rows={codeList}
              columns={columns}
              pageSize={5}
              // checkboxSelection
              disableSelectionOnClick
            />
          )}
        </div>
      </Box>
    </div>
  );
};

export default CodeManager;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    center: {
      position: 'absolute',
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    },
    table: {
      minWidth: 350,
    },
  }),
);
