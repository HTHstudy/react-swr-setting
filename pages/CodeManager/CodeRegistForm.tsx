import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Api from '@utils/Api';
import { Button, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

type CodeRegistFormProps = {
  onClose: () => void;
  selectedCodeGroup: string;
  setCodeList: () => void;
};

export default function CodeRegistForm({ onClose, selectedCodeGroup, setCodeList }: CodeRegistFormProps) {
  const classes = useStyles();
  const API = Api();

  const [codeGroup] = useState<string>(selectedCodeGroup);
  const [codeName, setCodeName] = useState<string>('');
  const [codeRemarks, setCodeRemarks] = useState<string>('');

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
      codeGroup,
      codeName,
      ...(codeRemarks && { codeRemarks }),
    };

    await API.registCode(body);
    setCodeList();

    onClose();
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleGrid}>
        <h1>{selectedCodeGroup} 추가</h1>
        <IconButton onClick={onClose} color="secondary" aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.myGrid}>
        <TextField value={codeGroup} disabled fullWidth label="코드 그룹" variant="outlined" required />
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
