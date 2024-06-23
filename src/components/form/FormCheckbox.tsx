import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type RhfCheckboxProps = {
  name: string;
  label: string;
} & Partial<CheckboxProps>;

const FormCheckbox: FC<RhfCheckboxProps> = ({ name, label, ...otherProps }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormControlLabel
            control={
              <Checkbox
                inputRef={field.ref}
                checked={(field.value as boolean) ?? false}
                onChange={(_, checked) => field.onChange(checked)}
                onBlur={field.onBlur}
                inputProps={{ 'aria-label': 'controlled' }}
                {...otherProps}
              />
            }
            label={label}
          />
        </FormControl>
      )}
    />
  );
};

export { FormCheckbox };
