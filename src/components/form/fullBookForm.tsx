/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  FormAutocomplete,
  FormDatePicker,
  FormRadioGroup,
  FormRating,
  FormSwitch,
  FormTextfield,
} from '@/components/form';
import { logger } from '@/util';
import { zodResolver } from '@hookform/resolvers/zod';
import { LibraryBooksRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState, type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { boolean, number, object, string, union, type TypeOf } from 'zod';

const MAX_PERCENTAGE = 100;

const fullBookSchema = object({
  isbn: string().regex(
    /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/u,
    'Kein gültiges ISBN-Format (z.B. 978-0-007-00644-1)',
  ),
  titel: object({
    titel: string().min(1, 'Titel ist erforderlich'),
    untertitel: string(),
  }),
  art: string().min(1, 'Art ist erforderlich'),
  rating: number(),
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  preis: number().min(0.01, 'Preis muss positiv sein'),
  rabatt: number()
    .min(0, 'Rabatt muss positiv sein')
    .max(MAX_PERCENTAGE, `Rabatt darf nicht über ${MAX_PERCENTAGE}% sein`),
  datum: string().nullish(),
  homepage: union([
    string().regex(
      // eslint-disable-next-line regexp/no-useless-quantifier, regexp/no-super-linear-backtracking, regexp/prefer-w, regexp/no-misleading-capturing-group, regexp/optimal-quantifier-concatenation
      /^(https?:\/\/(www\.)?|ftp:\/\/(www\.)?|www\.){1}([0-9A-Za-z-.@:%_+~#=]+)+((\.[a-zA-Z]{2,3})+)(\/(.)*)?(\?(.)*)?/u,
      'Ungültige URL',
    ),
    string().min(1),
  ]),
  lieferbar: boolean(),
  schlagwoerter: string().array(),
});

type FullBookType = TypeOf<typeof fullBookSchema>;

interface BookFormProps {
  onHandleSubmit: (values: FullBookType) => void;
  defaultValues?: FullBookType;
}

const fullBookDefaultValues: FullBookType = {
  isbn: '',
  titel: { titel: '', untertitel: '' },
  rating: 0,
  art: '',
  preis: 0.01,
  rabatt: 0,
  lieferbar: false,
  datum: undefined,
  homepage: '',
  schlagwoerter: [],
};

const FullBookForm: FC<BookFormProps> = ({
  onHandleSubmit,
  defaultValues = fullBookDefaultValues,
}) => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const methods = useForm<FullBookType>({
    resolver: zodResolver(fullBookSchema),
    defaultValues,
  });

  const onSave = (values: FullBookType) => {
    logger.debug(`onSave: values=${JSON.stringify(values)}`);
    values.rabatt = Number(values.rabatt) / MAX_PERCENTAGE;
    setLoading(true);
    onHandleSubmit(values);
    setLoading(false);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {loading ? (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.8)'
                : 'rgba(0, 0, 0, 0.8)',
            zIndex: 9999,
          }}
        >
          <CircularProgress
            size={60}
            thickness={5}
            sx={{
              color: 'secondary.main',
              animationDuration: '550ms',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />
        </Box>
      ) : undefined}
      <FormProvider {...methods}>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            '& .MuiTextField-root': isDesktop
              ? { m: 1, width: '65ch' }
              : { m: 1, width: '25ch' },
            '& .MuiFormControl-root': isDesktop
              ? { m: 1, width: '65ch' }
              : { m: 1, width: '25ch' },
            '& .MuiSwitch-root': { m: 1, width: '6ch' },
            '& .MuiButton-root': isDesktop
              ? { m: 1, mb: 10, width: '40ch' }
              : { m: 1, mb: 10, width: '20ch' },
            ...(isDesktop
              ? {
                  width: '65ch',
                }
              : {
                  width: '25ch',
                }),
          }}
          noValidate
          autoComplete="off"
          onSubmit={methods.handleSubmit(onSave)}
        >
          <FormTextfield
            label="ISBN"
            type="text"
            name="isbn"
            required
            data-cy="isbn-post"
          />
          <FormTextfield
            label="Titel"
            type="text"
            name="titel.titel"
            required
            data-cy="titel-post"
          />
          <FormTextfield
            label="Untertitel"
            type="text"
            name="titel.untertitel"
          />
          <FormTextfield
            name="preis"
            label="Preis"
            endAdornment="€"
            isNumber
            InputProps={{ inputProps: { min: 0.01, step: 0.01 } }}
            data-cy="preis-post"
          />
          <FormTextfield
            name="rabatt"
            label="Rabatt"
            endAdornment="%"
            isNumber
            InputProps={{ inputProps: { min: 0, step: 0.01 } }}
            data-cy="rabatt-post"
          />
          <FormDatePicker label="Datum" name="datum" />
          <FormTextfield
            label="Homepage"
            type="text"
            name="homepage"
            required
            data-cy="homepage-post"
          />
          <FormAutocomplete
            name="schlagwoerter"
            label="Schlagwörter"
            options={['JavaScript', 'TypeScript']}
          />
          <FormRating
            name="rating"
            label="Bewertung"
            size="large"
            data-cy="post-rating"
          />
          <FormRadioGroup
            row
            name="art"
            options={['KINDLE', 'DRUCKAUSGABE']}
            data-cy="type"
          />
          <FormSwitch
            name="lieferbar"
            label="Lieferbar"
            data-cy="post-lieferbar"
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={!methods.formState.isDirty}
            data-cy="post-button-form"
            startIcon={<LibraryBooksRounded />}
          >
            OK
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

export { FullBookForm };
export type { FullBookType };
