import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export interface AutoCompleteOptionType<T> {
  value: T;
  name: string;
}
type PropsType<T> = {
  value: any;
  setValue: React.Dispatch<React.SetStateAction<AutoCompleteOptionType<T> | undefined>>;
  options: AutoCompleteOptionType<T>[] | undefined;
  label: string;
  disabled?: boolean;
};

export default function MyAutoComplete<T>({ value, setValue, options, label, disabled }: PropsType<T>) {
  return (
    <Autocomplete
      disabled={disabled}
      fullWidth
      value={value}
      onChange={(event: any, newValue: any) => setValue(newValue)}
      options={options ? options : []}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
    />
  );
}
