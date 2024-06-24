// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

const ROWS_PER_PAGE = 5;
const ROW_MULTIPLIER = 53;

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
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
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
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
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
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
};

const BookTable = (props: BookTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const navigate = useNavigate();
  const rows = props.rows.sort((a, b) => (a.rating > b.rating ? -1 : 1));

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
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
                navigate(`/buchweb/book/${row.id}`);
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
            <TableRow hover style={{ height: ROW_MULTIPLIER * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow sx={{ width: '100%' }}>
            <TablePagination
              rowsPerPageOptions={[
                ROWS_PER_PAGE,
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                2 * ROWS_PER_PAGE,
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                3 * ROWS_PER_PAGE,
                { label: 'All', value: -1 },
              ]}
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
