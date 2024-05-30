import { TextField, TextFieldProps, useTheme } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type RhfTextfieldProps = {
  name: string;
} & Partial<TextFieldProps>;

const FormTextfield: FC<RhfTextfieldProps> = ({ name, ...otherProps }) => {
  const theme = useTheme();
  const color = theme.palette.primary.dark;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          {...otherProps}
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
        />
      )}
    />
  );
};

export { FormTextfield };
