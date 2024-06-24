import {
  FormControlLabel,
  Switch,
  Typography,
  type SwitchProps,
} from '@mui/material';
import { type FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type RhfSwitchProps = {
  name: string;
  label: string;
} & Partial<SwitchProps>;

const FormSwitch: FC<RhfSwitchProps> = ({ name, label, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <FormControlLabel
            control={<Switch {...otherProps} />}
            checked={Boolean(field.value)}
            onChange={() => field.onChange(!field.value)}
            label={label}
          />
          {errors[name] && (
            <Typography color="error">
              {errors[name]?.message?.toString()}
            </Typography>
          )}
        </>
      )}
    />
  );
};

export { FormSwitch };
