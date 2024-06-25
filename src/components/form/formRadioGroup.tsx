import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  type RadioGroupProps,
} from '@mui/material';
import { type FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type RhfRadioGroupProps = {
  name: string;
  options: string[];
} & Partial<RadioGroupProps>;

const FormRadioGroup: FC<RhfRadioGroupProps> = ({
  name,
  options,
  ...otherProps
}) => {
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
          <RadioGroup {...field} {...otherProps}>
            {options.map((option) => (
              <FormControlLabel
                value={option}
                key={option}
                control={<Radio color="primary" />}
                label={option}
              />
            ))}
          </RadioGroup>
          {errors[name] && (
            <Typography color="error">
              {errors[name].message?.toString()}
            </Typography>
          )}
        </>
      )}
    />
  );
};

export { FormRadioGroup };
