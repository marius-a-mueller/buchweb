import { TextField, TextFieldProps, useTheme } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type InputParams = {
  name: string;
} & TextFieldProps;

const FormInput: FC<InputParams> = ({ name, ...otherParams }) => {
  const theme = useTheme();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const color = theme.palette.primary.dark;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          {...otherParams}
          sx={{
            '& label.Mui-focused': { color },
            '& .MuiInput-underline:after': {
              borderBottomColor: color,
            },
            // focused color for input with variant='filled'
            '& .MuiFilledInput-underline:after': {
              borderBottomColor: color,
            },
            // focused color for input with variant='outlined'
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: color,
              },
            },
          }}
          name={name}
          error={!!errors[name]}
          helperText={
            errors[name] ? (errors[name]?.message as unknown as string) : ''
          }
          required
        />
      )}
    />
  );
};

export { FormInput };
