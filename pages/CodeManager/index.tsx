import React, { useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@material-ui/core';
import CodeTable from '@pages/CodeManager/CodeTable';
import { CodeType } from '@typings/global';
import useCodeGroup from './useCodeGroup';

export interface CodeColumn {
  id: 'code' | 'codeName' | 'codeGroup' | 'codeRemarks';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
}

const CodeManager = () => {
  const { codeGroupList } = useCodeGroup();
  const [tabIndex, setTabIndex] = useState(0);
  const [columns, setColumns] = useState<CodeColumn[]>();
  const [rows, setRows] = useState<CodeType[]>();

  useEffect(() => {
    if (!codeGroupList) return;
    if (columns) return;

    setColumns([
      { id: 'code', label: '코드', minWidth: 170 },
      { id: 'codeName', label: '코드명', minWidth: 170 },
      { id: 'codeGroup', label: '코드그룹', minWidth: 170 },
      { id: 'codeRemarks', label: '비고', minWidth: 170 },
    ]);
  }, [codeGroupList]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (tabIndex == newValue) return;
    setRows(undefined);
    setTabIndex(newValue);
  };
  useEffect(() => {}, [tabIndex]);

  return (
    <div>
      <Box>
        <Tabs variant="fullWidth" value={tabIndex} onChange={handleChange} aria-label="code tabs">
          {codeGroupList?.map((code) => (
            <Tab key={code.code} style={{ backgroundColor: '#cfe8fc' }} label={code.codeName} />
          ))}
        </Tabs>
        {columns && codeGroupList && (
          <CodeTable codeGroup={codeGroupList[tabIndex].code} columns={columns} rows={rows} setRows={setRows} />
        )}
      </Box>
    </div>
  );
};

export default CodeManager;
