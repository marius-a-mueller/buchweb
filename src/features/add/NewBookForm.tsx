import { FC } from 'react';
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { boolean, nullable, number, object, string, TypeOf, union } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import {
  FormAutocomplete,
  FormDatePicker,
  FormRating,
  FormRadioGroup,
  FormTextfield,
  FormSwitch,
} from '@/components';
import { addBook } from './api/addBook';
import { useAuth } from '../auth';
import { searchBooks } from '../search/api/searchBooks';
import { useNavigate } from 'react-router-dom';

const newBookSchema = object({
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
  preis: number().min(0.01, 'Preis muss positiv sein'),
  rabatt: number().min(0),
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

type bookType = TypeOf<typeof newBookSchema>;

const NewBookForm: FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const defaultValues: bookType = {
    isbn: '',
    titel: { titel: '', untertitel: '' },
    rating: 0,
    art: '',
    preis: 0.01,
    rabatt: 0,
    lieferbar: false,
    datum: null,
    homepage: '',
    schlagwoerter: [],
  };

  const methods = useForm<bookType>({
    resolver: zodResolver(newBookSchema),
    defaultValues,
  });

  const onHandleSubmit = async (values: bookType) => {
    try {
      await addBook({ book: values, token });
      const response = await searchBooks({
        searchProps: [{ term: 'isbn', value: values.isbn }],
      });
      console.log(response);
      navigate(`/buchweb/book/${response[0].id}`);
    } catch (error) {
      console.error('Error adding book: ', error);
    }
  };

  return (
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
        onSubmit={methods.handleSubmit(onHandleSubmit)}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            mb: 2,
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: '15px',
          }}
        >
          Neues Buch hinzufügen
        </Typography>
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
        <FormTextfield label="Untertitel" type="text" name="titel.untertitel" />
        <FormTextfield
          label="Preis"
          name="preis"
          isNumber={true}
          InputProps={{ inputProps: { min: 0, step: 0.01 } }}
        />
        <FormTextfield
          label="Rabatt"
          name="rabatt"
          isNumber={true}
          InputProps={{ inputProps: { min: 0, step: 0.01 } }}
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
        <FormRating name="rating" label="Bewertung" size="large" />
        <FormRadioGroup
          row
          name="art"
          options={['KINDLE', 'DRUCKAUSGABE']}
          data-cy="type"
        />
        <FormSwitch name="lieferbar" label="Lieferbar" />

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          data-cy="post-button-form"
          startIcon={<LibraryBooksRoundedIcon />}
        >
          Buch hinzufügen
        </Button>
      </Box>
    </FormProvider>
  );
};

export { NewBookForm };
export type { bookType };
