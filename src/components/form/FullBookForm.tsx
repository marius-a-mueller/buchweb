import { FC, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import {
  FormAutocomplete,
  FormDatePicker,
  FormRating,
  FormRadioGroup,
  FormTextfield,
  FormSwitch,
} from '@/components/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { boolean, nullable, number, object, string, TypeOf, union } from 'zod';
import { logger } from '@/util';

type BookFormProps = {
  onHandleSubmit: (values: fullBookType) => void;
  defaultValues?: fullBookType;
};

const fullBookSchema = object({
  isbn: string().regex(
    /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
    'Kein gültiges ISBN-Format (z.B. 978-0-007-00644-1)'
  ),
  titel: object({
    titel: string().min(1, 'Titel ist erforderlich'),
    untertitel: string(),
  }),
  art: string().min(1, 'Art ist erforderlich'),
  rating: number(),
  preis: number().min(0, 'Preis muss positiv sein'),
  rabatt: number().min(0, 'Rabatt muss positiv sein'),
  datum: nullable(string()),
  homepage: union([
    string().regex(
      new RegExp(
        '^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?'
      ),
      'Ungültige URL'
    ),
    string().min(1),
  ]),
  lieferbar: boolean(),
  schlagwoerter: string().array(),
});

const fullBookDefaultValues: fullBookType = {
  isbn: '',
  titel: { titel: '', untertitel: '' },
  rating: 0,
  art: '',
  preis: 0,
  rabatt: 0,
  lieferbar: false,
  datum: '',
  homepage: '',
  schlagwoerter: [],
};

type fullBookType = TypeOf<typeof fullBookSchema>;

const FullBookForm: FC<BookFormProps> = ({
  onHandleSubmit,
  defaultValues = fullBookDefaultValues,
}) => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const methods = useForm<fullBookType>({
    resolver: zodResolver(fullBookSchema),
    defaultValues,
  });

  const onSave = async (values: fullBookType) => {
    logger.info('Formstate: ' + JSON.stringify(methods.formState.dirtyFields));
    logger.info('val:' + JSON.stringify(values));
    setLoading(true);
    await onHandleSubmit(values);
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
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
      ) : null}
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
            isNumber={true}
            InputProps={{ inputProps: { min: 0, step: 0.01 } }}
            data-cy="preis-post"
          />
          <FormTextfield
            name="rabatt"
            label="Rabatt"
            endAdornment="%"
            isNumber={true}
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
          <FormRating name="rating" label="Bewertung" size="large" data-cy='post-rating' />
          <FormRadioGroup
            row
            name="art"
            options={['KINDLE', 'DRUCKAUSGABE']}
            data-cy="type"
          />
          <FormSwitch name="lieferbar" label="Lieferbar" data-cy='post-lieferbar'/>

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={!methods.formState.isDirty}
            data-cy="post-button-form"
            startIcon={<LibraryBooksRoundedIcon />}
          >
            OK
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

export { FullBookForm };
// eslint-disable-next-line react-refresh/only-export-components
export type { fullBookType };
