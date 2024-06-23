import {
  Autocomplete,
  AutocompleteProps,
  Chip,
  TextField,
  useTheme,
} from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type RhfAutocompleteProps = {
  name: string;
  label: string;
  options: string[];
} & Partial<AutocompleteProps<string, true, false, true>>;

const FormAutocomplete: FC<RhfAutocompleteProps> = ({
  name,
  label,
  options,
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
          {...otherProps}
          renderTags={(value: readonly string[]) =>
            value.map((option: string) => (
              <Chip variant="outlined" label={option} key={option} />
            ))
          }
          renderInput={(props) => (
            <TextField
              {...props}
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

export { FormAutocomplete };
