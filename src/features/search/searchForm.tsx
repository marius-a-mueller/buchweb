/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  FormAutocomplete,
  FormCheckbox,
  FormRating,
  FormTextfield,
} from '@/components/form';
import { logger } from '@/util';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { searchBooks } from './api/searchBooks';
import { type BookTableRow } from './bookTable';
import {
  searchBookDefaultValues,
  searchBookSchema,
  type SearchBookType,
} from './searchBookType';

const TIMEOUT = 1000;

interface SearchFormProps {
  setBookTableRows: (rows: BookTableRow[]) => void;
}

const SearchForm = (props: SearchFormProps) => {
  const { setBookTableRows } = props;
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const onHandleSubmit = async (values: SearchBookType) => {
    setLoading(true);
    const searchProps = [
      { term: 'isbn', value: values.isbn },
      { term: 'titel', value: values.titel.titel },
      { term: 'rating', value: values.rating },
      {
        term: 'javascript',
        value: values.schlagwoerter.includes('JavaScript'),
      },
      {
        term: 'typescript',
        value: values.schlagwoerter.includes('TypeScript'),
      },
    ];
    if (values.kindle && !values.druckausgabe) {
      searchProps.push({
        term: 'art',
        value: 'KINDLE',
      });
    } else if (!values.kindle && values.druckausgabe) {
      searchProps.push({
        term: 'art',
        value: 'DRUCKAUSGABE',
      });
    }
    try {
      const rows = await searchBooks({ searchProps });
      setTimeout(() => {
        setBookTableRows(rows.length > 0 ? rows : []);
        setLoading(false);
      }, TIMEOUT);
    } catch (err) {
      logger.debug('submitSearch: Kein Buch gefunden. error=', err);
      setBookTableRows([]);
      setLoading(false);
    }
  };

  const methods = useForm<SearchBookType>({
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
              backgroundColor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.8)'
                  : 'rgba(0, 0, 0, 0.8)',
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
                : { m: 1, width: '30ch' },
              '& .MuiFormControl-root': isDesktop
                ? { m: 1, width: '65ch' }
                : { m: 1, width: '30ch' },
              '& .MuiSwitch-root': { m: 1, width: '6ch' },
              '& .MuiButton-root': isDesktop
                ? { m: 1, mb: 10, width: '40ch' }
                : { m: 1, mb: 10, width: '20ch' },
              '& .MuiPaper-root': isDesktop
                ? { m: 1, mb: 10, width: '65ch' }
                : { m: 1, mb: 10, width: '30ch' },
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
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '65ch',
                paddingX: '1rem',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isDesktop ? 'row' : 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '65ch',
                }}
              >
                <FormCheckbox name="kindle" label="Kindle" data-cy="type" />
                <FormCheckbox
                  name="druckausgabe"
                  label="Druckausgabe"
                  data-cy="type"
                />
              </Box>
              {methods.formState.errors.kindle ? (
                <FormHelperText error>
                  {methods.formState.errors.kindle.message}
                </FormHelperText>
              ) : undefined}
            </Paper>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              data-cy="post-button-form"
              startIcon={<Search />}
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
