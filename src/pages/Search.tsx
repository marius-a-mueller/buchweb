import Box from '@mui/material/Box';
import { useState } from 'react';
import { BookTable, BookTableRow } from '@/features/search';
import { SearchForm } from '@/features/search';

const Search = () => {
  const [rows, setRows] = useState<BookTableRow[]>([]);
  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
          width: '60%',
        }}
        noValidate
        autoComplete="off"
      >
        <SearchForm
          setBookTableRows={(results: BookTableRow[]) => {
            setRows(results);
          }}
        ></SearchForm>
      </Box>
      <Box sx={{ width: '60%' }}>
        <BookTable rows={rows}></BookTable>
      </Box>
    </>
  );
};

export { Search };
