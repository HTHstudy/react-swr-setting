import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export type AutoCompleteOptionType = {
  value: number;
  name: string;
};
type PropsType = {
  value: any;
  setValue: React.Dispatch<React.SetStateAction<AutoCompleteOptionType | undefined>>;
  options: AutoCompleteOptionType[] | undefined;
  label: string;
  disabled?: boolean;
};

export default function MyAutoComplete({ value, setValue, options, label, disabled }: PropsType) {
  return (
    <Autocomplete
      disabled={disabled}
      value={value}
      onChange={(event: any, newValue: any) => setValue(newValue)}
      id="combo-box-demo"
      options={options ? options : []}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
    />
  );
}
