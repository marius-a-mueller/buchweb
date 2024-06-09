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
        className='searchForm'
        noValidate
        autoComplete="off"
      >
        <SearchForm
          setBookTableRows={(results: BookTableRow[]) => {
            setRows(results);
          }}
        ></SearchForm>
      </Box>
      <Box className="searchForm">
        <BookTable rows={rows}></BookTable>
      </Box>
    </>
  );
};

export { Search };
