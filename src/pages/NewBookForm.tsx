import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { boolean, object, string, TypeOf, union } from 'zod';
import { FormInput } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';

const newBookSchema = object({
  isbn: string().regex(
    new RegExp('^(?:d{10}|d{13}|d{3}-d{1}-d{3}-d{5}-d{1})$'),
    'Kein gültiges ISBN-Format'
  ),
  titel: string().min(1, 'Titel ist erforderlich'),
  art: string(),
  rating: string().min(0).max(5),
  preis: string().min(0, 'Preis darf nicht negativ sein'),
  rabatt: string().min(0),
  datum: string().optional(),
  homepage: union([
    string().regex(
      new RegExp(
        '^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?'
      ),
      'Ungültige URL'
    ),
    string().url().optional(),
  ]),
  lieferbar: boolean(),
  schlagwoerter: string().array(),
});

type bookType = TypeOf<typeof newBookSchema>;

const NewBookForm: FC = () => {
  const defaultValues: bookType = {
    isbn: '',
    titel: '',
    rating: '0',
    art: '',
    preis: '0',
    rabatt: '0',
    lieferbar: false,
    datum: '',
    homepage: '',
    schlagwoerter: [],
  };

  const methods = useForm<bookType>({
    resolver: zodResolver(newBookSchema),
    defaultValues,
  });

  const onHandleSubmit = (values: bookType) => {
    console.log(values);
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& .MuiTextField-root': { m: 1, width: '80ch' },
          '& .MuiFormControl-root': { m: 1, width: '80ch' },
          '& .MuiButton-root': { m: 1, width: '80ch' },
          '& .MuiSwitch-root': { m: 1, width: '6ch' },
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
        <FormInput label="ISBN" type="text" name="isbn" required />
        <FormInput label="Titel" type="text" name="titel" required />
        <FormInput label="Bewertung" type="number" name="rating" />
        <FormInput label="Preis" type="number" name="preis" />
        <FormInput label="Rabatt" type="number" name="rabatt" />
        <FormInput label="" type="date" name="datum" />
        <FormInput label="Homepage" type="text" name="homepage" />
        {/* <FormControl>
          <InputLabel id="art-label">Art</InputLabel>
          <Select
            labelId="art-label"
            id="art-select"
            name="art"
            value={book.art}
            onChange={handleSelectChange}
            label="Art"
          >
            <MenuItem value="Kindle">Kindle</MenuItem>
            <MenuItem value="Druckausgabe">Druckausgabe</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={book.lieferbar}
              onChange={handleChange}
              name="lieferbar"
            />
          }
          label="Lieferbar"
          labelPlacement="start"
          sx={{
            marginRight: 'auto',
          }}
        /> */}
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          startIcon={<LibraryBooksRoundedIcon />}
          sx={{ mt: 2 }}
        >
          Buch hinzufügen
        </Button>
      </Box>
    </FormProvider>
  );
};

export { NewBookForm };
