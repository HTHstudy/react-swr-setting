import React from 'react';
import MaterialTable from 'material-table';

const MTable = () => {
  return (
    // <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        title="Basic Selection Preview"
        columns={[
          {
            title: '구분',
            field: 'category',
            lookup: { 1: '문의', 2: '계약', 3: '종료' },
          },
          { title: '일자', field: 'date', type: 'date' },
          { title: '유입경로', field: 'funnel', type: 'string' },
          { title: '이름', field: 'name', type: 'string' },
          { title: '연락처', field: 'contact', type: 'string' },
        ]}
        data={[
          { category: 1, date: '1993-03-28', funnel: '???', name: '하태현', contact: '010-2590-7698' },
          { category: 2, date: '1993-03-28', funnel: '???', name: '하태현', contact: '010-2590-7698' },
          { category: 3, date: '1993-03-28', funnel: '???', name: '하태현', contact: '010-2590-7698' },
        ]}
        options={{
          selection: true,
          pageSize: 100,
          pageSizeOptions: [10, 50, 100],
          search: true,
          exportButton: true,
        }}
      />
    // </div>
  );
};

export default MTable;
