import { useState } from 'react';
import { BookTableRow } from './BookTable';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { searchBooks } from './api/searchBooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import {
  FormAutocomplete,
  FormRadioGroup,
  FormRating,
  FormTextfield,
} from '@/components';
import {
  searchBookDefaultValues,
  searchBookSchema,
  searchBookType,
} from './SearchBookType';

interface SearchFormProps {
  setBookTableRows: (rows: BookTableRow[]) => void;
}

const SearchForm = (props: SearchFormProps) => {
  const { setBookTableRows } = props;
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const onHandleSubmit = async (values: searchBookType) => {
    setLoading(true);
    const searchProps = [
      { term: 'isbn', value: values.isbn },
      { term: 'titel', value: values.titel.titel },
      { term: 'rating', value: values.rating },
      { term: 'art', value: values.art },
      {
        term: 'javascript',
        value: values.schlagwoerter.includes('JavaScript'),
      },
      {
        term: 'typescript',
        value: values.schlagwoerter.includes('TypeScript'),
      },
    ];
    try {
      const rows = await searchBooks({ searchProps });
      setTimeout(() => {
        setBookTableRows(rows?.length ? rows : []);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setBookTableRows([]);
      setLoading(false);
    }
  };

  const methods = useForm<searchBookType>({
    resolver: zodResolver(searchBookSchema),
    defaultValues: searchBookDefaultValues,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
        Suchformular
      </Typography>
      <Box sx={{ position: 'relative', width: '100%' }}>
        {loading && (
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
              zIndex: 1,
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
        )}
        <FormProvider {...methods}>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              columnGap: '1rem',
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
            }}
            noValidate
            autoComplete="off"
            onSubmit={methods.handleSubmit(onHandleSubmit)}
          >
            <FormTextfield
              label="ISBN"
              type="text"
              name="isbn"
              data-cy="isbn-post"
            />
            <FormTextfield
              label="Titel"
              type="text"
              name="titel.titel"
              data-cy="titel-post"
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
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              data-cy="post-button-form"
              startIcon={<SearchIcon />}
            >
              Suchen
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};

export { SearchForm };
