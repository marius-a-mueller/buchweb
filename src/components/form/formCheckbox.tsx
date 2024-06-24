import {
  Checkbox,
  FormControl,
  FormControlLabel,
  type CheckboxProps,
} from '@mui/material';
import { type FC } from 'react';
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
                checked={field.value as boolean}
                onChange={(_, checked) => field.onChange(checked)}
                onBlur={field.onBlur}
                // eslint-disable-next-line @typescript-eslint/naming-convention
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
