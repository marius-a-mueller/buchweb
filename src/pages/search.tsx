import { BookTable, SearchForm, type BookTableRow } from '@/features/search';
import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';

const Search = () => {
  const [rows, setRows] = useState<BookTableRow[] | undefined>();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          width: isDesktop ? '60%' : '90%',
        }}
      >
        <SearchForm
          setBookTableRows={(results: BookTableRow[]) => {
            setRows(results);
          }}
        />

        {rows?.length === 0 && (
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                color: 'red',
                fontWeight: 'bold',
              }}
            >
              Keine Bücher gefunden
            </Typography>
          </Paper>
        )}
        {rows && rows.length > 0 && <BookTable rows={rows}></BookTable>}
      </Box>
    </>
  );
};

export { Search };
