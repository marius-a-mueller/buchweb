import { BookTable, SearchForm, type BookTableRow } from '@/features/search';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';

const Search = () => {
  const [rows, setRows] = useState<BookTableRow[]>([]);
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
        ></SearchForm>
        <BookTable rows={rows}></BookTable>
      </Box>
    </>
  );
};

export { Search };
