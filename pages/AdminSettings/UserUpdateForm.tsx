import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Api from '@utils/Api';
import { Button, Checkbox, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { AutoCompleteOptionType } from '@components/MyAutoComplete';

import { Autocomplete } from '@material-ui/lab';
import useUserData from './useUserData';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { UserInfoType } from '@typings/global';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type UserUpdateFormProps = {
  rowData: UserInfoType;
  onClose: () => void;
};

export default function UserUpdateForm({ rowData, onClose }: UserUpdateFormProps) {
  const classes = useStyles();
  const { setUserData } = useUserData();
  const API = Api();

  const [email, setEmail] = useState<string>(rowData.email);
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>(rowData.userName);
  const [phone, setPhone] = useState<string>(rowData.phone ? rowData.phone : '');

  const [menuOptions, setMenuOptions] = useState<AutoCompleteOptionType<number>[]>();
  const [companyOptions, setCompanyOptions] = useState<AutoCompleteOptionType<string>[]>();

  const [menuValues, setMenuValues] = useState<AutoCompleteOptionType<number>[]>();
  const [companyValues, setCompanyValues] = useState<AutoCompleteOptionType<string>[]>();
  const [defaultMenu, setDefaultMenu] = useState<AutoCompleteOptionType<number>[]>([]);
  const [defaultComp, setDefaultComp] = useState<AutoCompleteOptionType<string>[]>([]);

  const getMenuOption = async () => {
    const menuList = await API.getMenuList();

    const _options = menuList?.map((menu) => {
      return { value: menu.menuId, name: menu.menuName };
    });
    if (rowData.menuList && _options) {
      const _values = _options.filter((comp) => rowData.compList.includes(comp.name));
      setDefaultMenu(_values);
    }
    setMenuOptions(_options);
  };
  const getCompanyOption = async () => {
    const companyCodeList = await API.getCode('COMPANY_CODE');

    const _options = companyCodeList?.map((company) => {
      return { value: company.code, name: company.codeName };
    });
    if (rowData.compList && _options) {
      const _values = _options.filter((comp) => rowData.compList.includes(comp.name));
      setDefaultComp(_values);
    }
    setCompanyOptions(_options);
  };

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
    const _menu = menuValues ? menuValues : defaultMenu;
    const _comp = companyValues ? companyValues : defaultComp;
    if (email && userName) {
      const body = {
        email,
        // userName,
        menuList: _menu.map((menu) => menu.value),
        compList: _comp.map((company) => company.value),
        ...(password && { password }),
        ...(phone && { phone }),
      };

      await API.updateUser(body);
      setUserData();
      onClose();
    } else {
      alert('모든 칸을 입력 해주세요');
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleGrid}>
        <h1>관리자 정보 수정</h1>
        <IconButton onClick={onClose} color="secondary" aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.myGrid}>
        <TextField
          disabled
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
            {...(rowData.menuList && {
              defaultValue: menuOptions.filter((menu) => rowData.menuList.includes(menu.name)),
            })}
            onChange={(event: any, newValue: any) => setMenuValues(newValue)}
            renderOption={(option, { selected }) => (
              <>
                <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                {option.name}
              </>
            )}
            renderInput={(params) => <TextField {...params} variant="outlined" label="접근가능메뉴" />}
          />
        )}
        {companyOptions && (
          <Autocomplete
            fullWidth
            multiple
            options={companyOptions}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            {...(rowData.compList && {
              defaultValue: companyOptions.filter((comp) => rowData.compList.includes(comp.name)),
            })}
            onChange={(event: any, newValue: any) => setCompanyValues(newValue)}
            renderOption={(option, { selected }) => (
              <>
                <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                {option.name}
              </>
            )}
            renderInput={(params) => <TextField {...params} variant="outlined" label="접근가능지점" />}
          />
        )}

        {/* <TextField style={{ visibility: 'hidden' }} fullWidth /> */}
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
