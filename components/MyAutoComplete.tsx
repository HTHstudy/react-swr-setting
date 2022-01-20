import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export interface AutoCompleteOptionType<T> {
  value: T;
  name: string;
}
type PropsType<T> = {
  value?: AutoCompleteOptionType<T>;
  setValue: (value: AutoCompleteOptionType<T>) => void;
  options: AutoCompleteOptionType<T>[] | undefined;
  label: string;
  disabled?: boolean;
};

export default function MyAutoComplete<T>({ value, setValue, options, label, disabled }: PropsType<T>) {
  return (
    <Autocomplete
      disabled={disabled}
      fullWidth
      disableClearable
      value={value ? value : (null as any)}
      onChange={(event: any, newValue: any) => setValue(newValue)}
      options={options ? options : []}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
    />
  );
}
