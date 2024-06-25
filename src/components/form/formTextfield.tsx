// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */
import { TextField, useTheme, type TextFieldProps } from '@mui/material';
import { type FC } from 'react';
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
          {...otherProps}
          value={field.value as string}
          onChange={(event) =>
            field.onChange(
              isNumber ? Number(event.target.value) : event.target.value,
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
          error={Boolean(errors[name])}
          helperText={
            errors[name] ? (errors[name].message as unknown as string) : ''
          }
          InputProps={{
            endAdornment,
          }}
        />
      )}
    />
  );
};

export { FormTextfield };
