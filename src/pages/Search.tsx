import Box from '@mui/material/Box';
import { useState } from 'react';
import { BookTable, BookTableRow } from '@/features/search';
import { SearchForm } from '@/features/search';
import { useMediaQuery, useTheme } from '@mui/material';

const Search = () => {
  const [rows, setRows] = useState<BookTableRow[]>([]);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Box
        sx={
          isDesktop
            ? {
                width: '60%',
              }
            : {
                width: '90%',
              } && {
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }
        }
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
