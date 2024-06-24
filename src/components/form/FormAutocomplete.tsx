// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Autocomplete,
  Chip,
  TextField,
  useTheme,
  type AutocompleteProps,
} from '@mui/material';
import { type FC } from 'react';
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value={value || ''}
          id="tags-filled"
          options={options}
          defaultValue={undefined}
          freeSolo
          {...otherProps}
          renderTags={(val: readonly string[]) =>
            val.map((option: string) => (
              <Chip variant="outlined" label={option} key={option} />
            ))
          }
          renderInput={(props) => (
            <TextField
              {...props}
              name={name}
              inputRef={ref}
              variant="filled"
              error={Boolean(errors[name])}
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
