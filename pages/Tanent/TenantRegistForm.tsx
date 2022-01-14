import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Api from '@utils/Api';
import { Button, TextField } from '@material-ui/core';
import MyAutoComplete, { AutoCompleteOptionType } from '@components/MyAutoComplete';

export default function TenantRegistForm() {
  const classes = useStyles();
  const [spotValue, setSpotValue] = useState<AutoCompleteOptionType>();
  const [roomValue, setRoomValue] = useState<AutoCompleteOptionType>();
  const [spotOptions, setSpotOptions] = useState<AutoCompleteOptionType[]>();
  const [roomOptions, setRoomOptions] = useState<AutoCompleteOptionType[]>();

  const getSpotOption = async () => {
    const spotList = await Api.getSpotList();
    const _options = spotList?.map((spot) => {
      return { value: spot.spotId, name: spot.spotName };
    });
    setSpotOptions(_options);
  };
  const getRoomOption = async (spotId: number) => {
    const roomList = await Api.getRoomList(spotId);

    const _options = roomList?.map((room) => {
      return { value: room.roomId, name: room.roomName };
    });
    setRoomOptions(_options);
  };

  useEffect(() => {
    setRoomValue(undefined);
    if (!spotValue) return;
    const spotId = spotValue.value;
    getRoomOption(spotId);
  }, [spotValue]);

  useEffect(() => {
    getSpotOption();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // TODO: form 입력 데이터
    console.log(data.get('spot'));
    // const email = data.get('email') as string;
    // const password = data.get('password') as string;

    // const result = await Api.login(email, password);
    // if (result) setToken();
  };

  function FormRow1() {
    return (
      <>
        <Grid item xs={4}>
          <TextField name="userName" fullWidth label="이름" variant="outlined" required />
        </Grid>
        <Grid item xs={4}>
          <TextField name="phone" fullWidth label="휴대폰" variant="outlined" />
        </Grid>
      </>
    );
  }
  function FormRow2() {
    return (
      <>
        <Grid item xs={4}>
          {spotOptions && (
            <MyAutoComplete options={spotOptions} value={spotValue} setValue={setSpotValue} label="지점" />
          )}
        </Grid>
        <Grid item xs={4}>
          <MyAutoComplete options={roomOptions} value={roomValue} setValue={setRoomValue} label="호수" />
        </Grid>
        <Grid item xs={4}>
          <TextField label="월세" fullWidth variant="outlined" />
        </Grid>
      </>
    );
  }
  function FormRow3() {
    return (
      <>
        <Grid item xs={4}>
          <TextField
            id="date"
            label="Birthday"
            type="date"
            defaultValue={new Date()}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="date"
            label="Birthday"
            type="date"
            defaultValue={new Date()}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </>
    );
  }
  function FormRow4() {
    return (
      <>
        <Grid item xs={4}>
          <TextField fullWidth label="이메일" variant="outlined" />
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth label="사업자번호" variant="outlined" />
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth label="사업자명" variant="outlined" />
        </Grid>
      </>
    );
  }

  return (
    <form className={classes.root} noValidate onSubmit={handleSubmit}>
      <Grid className={classes.center} container spacing={3}>
        <Grid container item xs={12} spacing={3}>
          <FormRow1 />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow2 />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow3 />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow4 />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      {/* <button onClick={() => Api.registTenantData()}>제출</button> */}
    </form>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    center: {
      justifyContent: 'center',
      // backgroundColor: 'red',
      // opacity: 0.1,
      width: 800,
      // height: 600,
      padding: 16,
    },
    root: {
      position: 'absolute',
      overflow: 'hidden',
      backgroundColor: '#fff',
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: 'red',
    },
    red: {
      backgroundColor: 'red',
    },
  }),
);
