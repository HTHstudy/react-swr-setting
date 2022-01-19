import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Api from '@utils/Api';
import { Button, Checkbox, IconButton, MenuItem, MenuList, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MyAutoComplete, { AutoCompleteOptionType } from '@components/MyAutoComplete';
import { Email } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import useUserData from './useUserData';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type UserRegistFormProps = {
  onClose: () => void;
};

export default function UserRegistForm({ onClose }: UserRegistFormProps) {
  const classes = useStyles();
  const { setUserData } = useUserData();
  const API = Api();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const [menuOptions, setMenuOptions] = useState<AutoCompleteOptionType<number>[]>();
  const [compnayOptions, setCompanyOptions] = useState<AutoCompleteOptionType<string>[]>();

  const [menuValues, setMenuValues] = useState<AutoCompleteOptionType<number>[]>();
  const [companyValues, setCompanyValues] = useState<AutoCompleteOptionType<string>[]>();

  const getMenuOption = async () => {
    const menuList = await API.getMenuList();
    console.log(menuList);
    const _options = menuList?.map((menu) => {
      return { value: menu.menuId, name: menu.menuName };
    });
    setMenuOptions(_options);
  };
  const getCompanyOption = async () => {
    const companyCodeList = await API.getCode('COMPANY_CODE');

    const _options = companyCodeList?.map((company) => {
      return { value: company.code, name: company.codeName };
    });
    setCompanyOptions(_options);
  };

  //   useEffect(() => {
  //     setRoomValue(undefined);
  //   }, [roomOptions]);

  //   useEffect(() => {
  //     if (!spotValue) return;
  //     const spotId = spotValue.value;
  //     getRoomOption(spotId);
  //   }, [spotValue]);

  useEffect(() => {
    getMenuOption();
    getCompanyOption();

    const EscClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', EscClose);

    return () => {
      window.removeEventListener('keydown', EscClose);
    };
  }, []);

  const handleSubmit = async () => {
    if (email) {
      console.log(menuValues, companyValues);
    }
    // if (
    //   userName &&
    //   phone &&
    //   paymentType &&
    //   companyValue &&
    //   spotValue &&
    //   roomValue &&
    //   monthlyFee &&
    //   extendMonth &&
    //   startDate
    // ) {
    //   const body = {
    //     userName,
    //     phone,
    //     paymentType,
    //     companyCode: companyValue.value,
    //     spotId: spotValue.value,
    //     roomId: roomValue.value,
    //     monthlyFee: Number(monthlyFee),
    //     extendMonth: Number(extendMonth),
    //     startDate,
    //     identify,
    //     businessName,
    //   };
    //   await API.registTenantData(body);
    //   setTenantData();
    //   onClose();
    // } else {
    //   alert('모든 칸을 입력 해주세요');
    // }
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleGrid}>
        <h1>관리자 생성</h1>
        <IconButton onClick={onClose} color="secondary" aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.myGrid}>
        <TextField
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
          label="ID"
          variant="outlined"
          required
        />
        <TextField
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          fullWidth
          label="비밀번호"
          variant="outlined"
          required
        />
        <TextField
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          fullWidth
          label="사용자명"
          variant="outlined"
          required
        />
      </div>
      <div className={classes.myGrid}>
        <TextField
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          fullWidth
          label="전화번호"
          variant="outlined"
          required
        />
        <TextField style={{ visibility: 'hidden' }} fullWidth />
        <TextField style={{ visibility: 'hidden' }} fullWidth />
      </div>
      <div className={classes.myGrid}>
        {menuOptions && (
          <Autocomplete
            fullWidth
            multiple
            options={menuOptions}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            onChange={(event: any, newValue: any) => setMenuValues(newValue)}
            renderOption={(option, { selected }) => (
              <>
                <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                {option.name}
              </>
            )}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Checkboxes" placeholder="Favorites" />
            )}
          />
        )}
        {compnayOptions && (
          <Autocomplete
            fullWidth
            multiple
            options={compnayOptions}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            onChange={(event: any, newValue: any) => setCompanyValues(newValue)}
            renderOption={(option, { selected }) => (
              <>
                <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                {option.name}
              </>
            )}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Checkboxes" placeholder="Favorites" />
            )}
          />
        )}

        <TextField style={{ visibility: 'hidden' }} fullWidth />
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
