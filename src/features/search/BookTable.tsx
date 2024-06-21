import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TableHead } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

interface BookTableRow {
  id: string;
  isbn: string;
  title: string;
  rating: string;
  type: string;
  price: string;
  inStock: boolean;
}

interface BookTableProps {
  rows: BookTableRow[];
}

const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

const BookTable = (props: BookTableProps) => {
  const [page, setPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const rows = props.rows?.sort((a, b) => (a.rating > b.rating ? -1 : 1));

  console.log({ selectedRow });

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} elevation={12}>
      <Table aria-label="custom pagination table" data-cy="book-table">
        <TableHead>
          <TableRow>
            <TableCell>Titel</TableCell>
            <TableCell align="right">Art</TableCell>
            <TableCell align="right">Preis</TableCell>
            <TableCell align="right">Sterne</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow
              hover={true}
              key={row.title}
              onClick={() => {
                setSelectedRow(row);
                navigate('/buchweb/book/' + row.id);
              }}
              sx={{
                cursor: 'pointer',
                '&:last-child td, &:last-child th': { border: 0 },
              }}
              data-cy={`book-row-${row.isbn}`}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell
                style={{
                  width: 160,
                }}
                align="right"
              >
                {row.type}
              </TableCell>
              <TableCell
                style={{
                  width: 160,
                }}
                align="right"
              >
                {row.price}
              </TableCell>
              <TableCell
                style={{
                  width: 160,
                }}
                align="right"
              >
                {row.rating}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow hover style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow sx={{ width: '100%' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              sx={{ width: '100%' }}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export { BookTable };
export type { BookTableProps, BookTableRow };
