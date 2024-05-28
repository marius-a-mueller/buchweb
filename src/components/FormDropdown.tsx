import { Autocomplete, Chip, TextField, useTheme } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type DropdownParams = {
  name: string;
  label: string;
  options: string[];
};

const FormDropdown: FC<DropdownParams> = ({
  name,
  label,
  options,
  ...otherParams
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
      defaultValue={undefined}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Autocomplete
          multiple
          onBlur={onBlur}
          onChange={(_, data) => onChange(data)}
          value={value || ''}
          id="tags-filled"
          options={options}
          defaultValue={undefined}
          freeSolo
          {...otherParams}
          renderTags={(value: readonly string[]) =>
            value.map((option: string) => (
              <Chip variant="outlined" label={option} key={option} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              name={name}
              inputRef={ref}
              variant="filled"
              error={!!errors[name]}
              label={label}
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
            />
          )}
        />
      )}
    />
  );
};

export { FormDropdown };
