import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DatePicker, TimePicker, DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const MyPicker = () => {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker disableToolbar value={selectedDate} onChange={handleDateChange} />
      {/* <TimePicker value={selectedDate} onChange={handleDateChange} />
      <DateTimePicker value={selectedDate} onChange={handleDateChange} /> */}
    </MuiPickersUtilsProvider>
  );
};

export default MyPicker;
