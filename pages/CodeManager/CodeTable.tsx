import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Button,
  MenuItem,
  Modal,
  TableHead,
  TextField,
  TableCell,
} from '@material-ui/core';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import SearchBar from 'material-ui-search-bar';
import { CodeColumn } from '@pages/CodeManager';
import { CodeType } from '@typings/global';
import Api from '@utils/Api';
import CodeRegistForm from './CodeRegistForm';
import CodeModifyForm from './CodeModifyForm';
import useCodeList from './useCodeList';

type CodeTableProps = {
  columns: CodeColumn[];
  codeGroup: string;
  rows: CodeType[] | undefined;
  setRows: React.Dispatch<React.SetStateAction<CodeType[] | undefined>>;
};

const EDITABLE_CODE = ['CONSULT_STATUS', 'PAYTYPE_CODE', 'TENANT_STATUS'];

const CodeTable = ({ columns, codeGroup, rows, setRows }: CodeTableProps) => {
  const { codeList: originRows, setCodeList } = useCodeList(codeGroup);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searched, setSearched] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<keyof CodeType>(columns[1].id);
  const isEditable = EDITABLE_CODE.includes(codeGroup);

  const [selectRow, setSelectRow] = useState<CodeType>();
  const API = Api();

  useEffect(() => {
    if (!originRows) return;
    setRows(originRows);
    setPage(0);
  }, [originRows]);

  const requestSearch = (searchedVal: string) => {
    if (!originRows) return;
    const filteredRows = originRows.filter((row: CodeType) => {
      return row[selectedFilter]!.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  const emptyRows = rows ? rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('when');
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen2 = (row: CodeType) => {
    setSelectRow(row);
  };

  const handleClose2 = () => {
    setOpen2(false);
    setSelectRow(undefined);
  };

  useEffect(() => {
    if (!selectRow) return;
    setOpen2(true);
  }, [selectRow]);

  const handleDelete = async (code: string) => {
    const willDelete = confirm(`정말 ${code}를 삭제 하시겠습니까?`);
    if (!willDelete) return;
    await API.deleteCode(code);
    setCodeList();
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          padding: '16px 0 16px 0',
        }}
      >
        <TextField
          style={{ width: 120, marginRight: 16 }}
          select
          value={selectedFilter}
          onChange={(event) => {
            setSelectedFilter(event.target.value as keyof CodeType);
          }}
          variant="outlined"
          required
          size="small"
        >
          {columns.map((column: CodeColumn) => (
            <MenuItem key={column.id} value={column.id}>
              {column.label}
            </MenuItem>
          ))}
        </TextField>
        <SearchBar
          style={{ marginRight: 16, height: 40 }}
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        {isEditable && (
          <Button onClick={handleOpen} variant="contained" color="primary">
            코드 추가
          </Button>
        )}
      </div>
      <Modal open={open}>
        <CodeRegistForm onClose={handleClose} selectedCodeGroup={codeGroup} setCodeList={setCodeList} />
      </Modal>
      {selectRow && (
        <Modal open={open2}>
          <CodeModifyForm onClose={handleClose2} row={selectRow} setCodeList={setCodeList} />
        </Modal>
      )}

      {rows && (
        <Paper style={{ width: '100%' }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {isEditable && (
                    <TableCell padding="none" align="center">
                      수정
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                  {isEditable && <TableCell padding="none">삭제</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: CodeType, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {isEditable && (
                        <TableCell padding="none" align="center">
                          <IconButton onClick={() => handleOpen2(row)} size="small" aria-label="edit">
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      )}
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                      {isEditable && (
                        <TableCell padding="none">
                          <IconButton onClick={() => handleDelete(row.code)} size="small" aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 33 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            rowsPerPageOptions={[10, 50, 100, { label: 'All', value: -1 }]}
            colSpan={3}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </Paper>
      )}
    </div>
  );
};

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(0),
    },
  }),
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

export default CodeTable;
