import { TextField, TextFieldProps, useTheme } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type RhfTextfieldProps = {
  name: string;
  isNumber?: boolean;
  endAdornment?: string;
} & Partial<TextFieldProps>;

const FormTextfield: FC<RhfTextfieldProps> = ({
  name,
  isNumber = false,
  endAdornment = '',
  InputProps,
  ...otherProps
}) => {
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
      defaultValue={isNumber ? 0 : ''}
      render={({ field }) => (
        <TextField
          {... field}
          {...otherProps}
          value={field.value}
          onChange={(event) =>
            field.onChange(
              isNumber ? Number(event.target.value) : event.target.value
            )
          }
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
          type={isNumber ? 'number' : 'text'}
          error={!!errors[name]}
          helperText={
            errors[name] ? (errors[name]?.message as unknown as string) : ''
          }
          InputProps={{
            ...InputProps,
            endAdornment,
          }}
        />
      )}
    />
  );
};

export { FormTextfield };
