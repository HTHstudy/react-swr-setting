import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Api from '@utils/Api';
import { Button, IconButton, MenuItem, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MyAutoComplete, { AutoCompleteOptionType } from '@components/MyAutoComplete';
import useTenantData from './useTenantData';

type TenantRegistFormProps = {
  onClose: () => void;
};

export default function TenantRegistForm({ onClose }: TenantRegistFormProps) {
  const classes = useStyles();
  const { setTenantData } = useTenantData();
  const API = Api();

  const [spotOptions, setSpotOptions] = useState<AutoCompleteOptionType<number>[]>();
  const [roomOptions, setRoomOptions] = useState<AutoCompleteOptionType<number>[]>();
  const [compnayOptions, setCompanyOptions] = useState<AutoCompleteOptionType<string>[]>();
  const [payTypeOptions, setPayTypeOptions] = useState<{ value: string; label: string }[]>();

  const [userName, setUserName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [paymentType, setPaymentType] = useState<string>('');

  const [companyValue, setCompanyValue] = useState<AutoCompleteOptionType<string>>();
  const [spotValue, setSpotValue] = useState<AutoCompleteOptionType<number>>();
  const [roomValue, setRoomValue] = useState<AutoCompleteOptionType<number>>();

  const [monthlyFee, setMonthlyFee] = useState<string>('');
  const [extendMonth, setExtendMonth] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');

  const [identify, setIdentify] = useState<string>('');
  const [businessName, setBusinessName] = useState<string>('');

  const getSpotOption = async () => {
    const spotList = await API.getSpotList();
    const _options = spotList?.map((spot) => {
      return { value: spot.spotId, name: spot.spotName };
    });
    setSpotOptions(_options);
  };
  const getRoomOption = async (spotId: number) => {
    const roomList = await API.getRoomList(spotId);

    const _options = roomList?.map((room) => {
      return { value: room.roomId, name: room.roomName };
    });
    setRoomOptions(_options);
  };
  const getCompanyOption = async () => {
    const companyCodeList = await API.getCode('COMPANY_CODE');

    const _options = companyCodeList?.map((company) => {
      return { value: company.code, name: company.codeName };
    });
    setCompanyOptions(_options);
  };

  const getPayTypeOption = async () => {
    const payTypeCodeList = await API.getCode('PAYTYPE_CODE');

    const _options = payTypeCodeList?.map((payType) => {
      return { value: payType.code, label: payType.codeName };
    });
    setPayTypeOptions(_options);
  };

  useEffect(() => {
    setRoomValue(undefined);
  }, [roomOptions]);

  useEffect(() => {
    if (!spotValue) return;
    const spotId = spotValue.value;
    getRoomOption(spotId);
  }, [spotValue]);

  useEffect(() => {
    getSpotOption();
    getCompanyOption();
    getPayTypeOption();

    const EscClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', EscClose);

    return () => {
      window.removeEventListener('keydown', EscClose);
    };
  }, []);

  const handleSubmit = async () => {
    if (
      userName &&
      phone &&
      paymentType &&
      companyValue &&
      spotValue &&
      roomValue &&
      monthlyFee &&
      extendMonth &&
      startDate
    ) {
      const body = {
        userName,
        phone,
        paymentType,
        companyCode: companyValue.value,
        spotId: spotValue.value,
        roomId: roomValue.value,
        monthlyFee: Number(monthlyFee),
        extendMonth: Number(extendMonth),
        startDate,
        identify,
        businessName,
      };
      await API.registTenantData(body);
      setTenantData();
      onClose();
    } else {
      alert('모든 칸을 입력 해주세요');
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleGrid}>
        <h1>계약 생성</h1>
        <IconButton onClick={onClose} color="secondary" aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.myGrid}>
        <TextField
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          fullWidth
          label="이름"
          variant="outlined"
          required
        />
        <TextField
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          fullWidth
          label="휴대폰"
          variant="outlined"
          required
        />
        <TextField
          select
          fullWidth
          value={paymentType}
          onChange={(event) => setPaymentType(event.target.value)}
          variant="outlined"
          required
          label="결제타입"
        >
          {payTypeOptions?.map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className={classes.myGrid}>
        <MyAutoComplete options={compnayOptions} value={companyValue} setValue={setCompanyValue} label="담당업체 *" />
        <MyAutoComplete options={spotOptions} value={spotValue} setValue={setSpotValue} label="지점 *" />
        <MyAutoComplete options={roomOptions} value={roomValue} setValue={setRoomValue} label="호수 *" />
      </div>
      <div className={classes.myGrid}>
        <TextField
          value={monthlyFee}
          onChange={(event) => setMonthlyFee(event.target.value)}
          fullWidth
          label="월세"
          variant="outlined"
          required
          type="number"
        />
        <TextField
          value={extendMonth}
          onChange={(event) => setExtendMonth(event.target.value)}
          fullWidth
          label="연장계약"
          variant="outlined"
          required
          type="number"
        />
        <TextField
          label="시작일자"
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          defaultValue={new Date()}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          fullWidth
          required
        />
      </div>
      <div className={classes.myGrid}>
        <TextField
          value={identify}
          onChange={(event) => setIdentify(event.target.value)}
          fullWidth
          label="사업자등록번호"
          variant="outlined"
        />
        <TextField
          value={businessName}
          onChange={(event) => setBusinessName(event.target.value)}
          fullWidth
          label="사업자명"
          variant="outlined"
        />
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
