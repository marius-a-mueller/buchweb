import { useState } from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';
import { AxiosInstance } from '@/util/AxiosInstance';
import { useAuth } from '@/features/auth/hooks/useAuth';


interface BookDetailProps {
  id: number;
  isbn: string;
  titel: string;
  preis: number;
  art: string;
  rating: number;
  lieferbar: boolean;
  datum: string;
  homepage: string;
  schlagwoerter: string[];
  etag?: string; 
}

interface BookEditFormProps {
  book: BookDetailProps;
  onSave: (updatedBook: BookDetailProps) => void;
  etag: string | null;
}

const BookEditForm = ({ book, onSave, etag }: BookEditFormProps) => {
  const [editedBook, setEditedBook] = useState<BookDetailProps>(book);
  const [, setEtag] = useState<string | null>(etag);
  const { token } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedBook) {
      let updatedBook = { ...editedBook}
      if (e.target.name === 'schlagwoerter') {
        updatedBook = {
          ...updatedBook,
          [e.target.name]: e.target.value.split(',').map((word) => word.trim()),
        };
      } else if (e.target.name === 'lieferbar') {
        updatedBook = {
          ...updatedBook,
          [e.target.name]: e.target.value === 'true',
        };
      } else {
        updatedBook = {
          ...updatedBook,
          [e.target.name]: e.target.value,
        };
      }

      setEditedBook(updatedBook);
    }
  };



  const handleSave = async () => {
    console.log("ETag before save:", etag);

    try {
      const response = await AxiosInstance.put(
        `/rest/${book.id}`,
        {
          id: editedBook.id,
          isbn: editedBook.isbn,
          titel: editedBook.titel,
          preis: parseFloat(editedBook.preis.toString()),
          art: editedBook.art,
          rating: parseFloat(editedBook.rating.toString()),
          lieferbar: Boolean(editedBook.lieferbar),
          datum: editedBook.datum,
          homepage: editedBook.homepage,
          schlagwoerter: editedBook.schlagwoerter,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'If-Match': etag ? etag : '',
          },
        }
      );
      const newEtag = response.headers['etag'] || response.headers['ETag'];
    onSave({ ...editedBook, etag: newEtag });
    setEtag(newEtag);
    } catch (error) {
      console.error('Error updating book details:', error);
    }
  };
 
  return (
    <>
      <TextField
        fullWidth
        label="Titel"
        name="titel"
        value={editedBook.titel}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="ISBN"
        name="isbn"
        value={editedBook.isbn}
        onChange={handleChange}
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        fullWidth
        label="Preis"
        name="preis"
        type="number"
        value={editedBook.preis}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Art"
        name="art"
        value={editedBook.art}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Homepage"
        name="homepage"
        value={editedBook.homepage}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Bewertung"
        name="rating"
        type="number"
        value={editedBook.rating}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        select
        fullWidth
        label="Lieferbar"
        name="lieferbar"
        value={editedBook.lieferbar ? 'true' : 'false'}
        onChange={handleChange}
        margin="normal"
      >
        <MenuItem value="true">Ja</MenuItem>
        <MenuItem value="false">Nein</MenuItem>
      </TextField>
      <TextField
        fullWidth
        label="Erscheinungsdatum"
        name="datum"
        type="date"
        value={editedBook.datum}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        label="Schlagwörter"
        name="schlagwoerter"
        value={editedBook.schlagwoerter.join(', ')}
        onChange={handleChange}
        margin="normal"
      />
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="contained" color="secondary" onClick={handleSave}>
          Speichern
        </Button>
        <Button variant="outlined" onClick={() => onSave(book)}>
          Abbrechen
        </Button>
      </Box>
    </>
  );
};

export { BookEditForm };