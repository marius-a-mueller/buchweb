import {
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material';
import { FC } from 'react';
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
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <RadioGroup {...field} {...otherProps}>
          {options.map((option) => (
            // <Radio key={option} value={option} />
            <FormControlLabel
              value={option}
              control={<Radio color="primary" />}
              label={option}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
};

export { FormRadioGroup };
