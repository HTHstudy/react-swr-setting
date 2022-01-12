import React, { useEffect, useState } from 'react';
import MaterialTable, { Column } from 'material-table';
import { ConsultType } from '@typings/global';
import useConsultData from './useConsultData';
import Api from '@utils/Api';

interface TableData {
  id: number;
  editing: any;
}
interface RowData extends ConsultType {
  tableData?: TableData;
}

const CustomerService = () => {
  const [columns, setColumns] = useState<Column<RowData>[]>();

  const { consultData, setConsultData } = useConsultData();

  useEffect(() => {
    if (!consultData) return;
    setColumns([
      {
        title: '구분',
        field: 'status',
        lookup: consultData.consultLookup,
        editable: 'onUpdate',
      },
      { title: '일자', field: 'registDate', type: 'date', editable: 'never' },
      {
        title: '이름',
        field: 'userName',
        type: 'string',
      },
      { title: '연락처', field: 'phone', type: 'string' },
      { title: '이메일', field: 'email', type: 'string', editable: 'never' },
      {
        title: '희망지역',
        field: 'wishSpot',
        lookup: consultData.locationLookup,
      },
      { title: '문의내용', field: 'content', type: 'string' },
    ]);
  }, [consultData]);

  return (
    <div>
      {consultData && columns && (
        <MaterialTable
          title="문의 테이블"
          columns={columns}
          data={consultData.list}
          editable={{
            onRowAdd: async (newData) => {
              try {
                const newConsult = {
                  wishSpot: newData.wishSpot,
                  userName: newData.userName,
                  phone: newData.phone,
                  content: newData.content,
                };
                await Api.registConsultData(newConsult);
                setConsultData();
              } catch (err) {
                alert('등록에 실패 했습니다.');
              }
            },
            onRowUpdate: async (newData) => {
              try {
                const newConsult = {
                  consultId: newData.consultId,
                  status: newData.status,
                  wishSpot: newData.wishSpot,
                  userName: newData.userName,
                  phone: newData.phone,
                  content: newData.content,
                };
                await Api.updateConsultData(newConsult);
                setConsultData();
              } catch (err) {
                alert('수정에 실패 했습니다.');
              }
            },
          }}
          options={{
            selection: true,
            pageSize: 100,
            pageSizeOptions: [10, 50, 100],
            search: true,
            exportButton: true,
            addRowPosition: 'first',
          }}
        />
      )}
    </div>
  );
};

export default CustomerService;
