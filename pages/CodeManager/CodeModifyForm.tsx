import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Api from '@utils/Api';
import { Button, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { CodeType } from '@typings/global';

type CodeModifyFormProps = {
  onClose: () => void;
  row: CodeType;
  setCodeList: () => void;
};

export default function CodeModifyForm({ onClose, row, setCodeList }: CodeModifyFormProps) {
  const classes = useStyles();
  const API = Api();

  const [code] = useState<string>(row.code);
  const [codeName, setCodeName] = useState<string>(row.codeName);
  const [codeRemarks, setCodeRemarks] = useState<string>(row.codeRemarks ? row.codeRemarks : '');

  useEffect(() => {
    const EscClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', EscClose);

    return () => {
      window.removeEventListener('keydown', EscClose);
    };
  }, []);

  const handleSubmit = async () => {
    if (!codeName) {
      alert('코드명을 입력 해주세요');
      return;
    }

    const body = {
      code,
      codeName,
      ...(codeRemarks && { codeRemarks }),
    };

    await API.updateCode(body);
    setCodeList();

    onClose();
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleGrid}>
        <h1>{code} 수정</h1>
        <IconButton onClick={onClose} color="secondary" aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.myGrid}>
        <TextField value={code} disabled fullWidth label="코드" variant="outlined" required />
        <TextField
          value={codeName}
          onChange={(event) => setCodeName(event.target.value)}
          fullWidth
          label="코드 명"
          variant="outlined"
          required
        />
        <TextField
          value={codeRemarks}
          onChange={(event) => setCodeRemarks(event.target.value)}
          fullWidth
          label="비고"
          variant="outlined"
          required
        />
      </div>

      <Button color="primary" variant="contained" onClick={handleSubmit}>
        제출
      </Button>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      overflow: 'hidden',
      backgroundColor: '#fff',
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],

      justifyContent: 'center',
      width: '80vw',
      padding: '0 16px 16px 16px',
    },
    myGrid: {
      display: 'flex',
      marginBottom: 16,
      gap: '0 20px',
    },
    titleGrid: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
);
