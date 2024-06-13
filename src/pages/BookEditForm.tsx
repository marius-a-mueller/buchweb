import { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Grid, Typography, Paper, Container, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
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

  const [isJavaScript, setIsJavaScript] = useState<boolean>(book.schlagwoerter.includes('JAVASCRIPT'));
  const [isTypeScript, setIsTypeScript] = useState<boolean>(book.schlagwoerter.includes('TYPESCRIPT'));

  useEffect(() => {
    const newSchlagwoerter: string[] = [];
    if (isJavaScript) newSchlagwoerter.push('JAVASCRIPT');
    if (isTypeScript) newSchlagwoerter.push('TYPESCRIPT');
    setEditedBook(prev => ({
      ...prev,
      schlagwoerter: newSchlagwoerter,
    }));
  }, [isJavaScript, isTypeScript]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedBook(prev => ({
      ...prev,
      [name]: name === 'lieferbar' ? value === 'true' : value,
    }));
  };

  const handleSave = async () => {
    console.log("ETag before save:", etag);

    try {
      const response = await AxiosInstance.put(
        `/rest/${book.id}`,
        {
          ...editedBook,
          preis: parseFloat(editedBook.preis.toString()),
          rating: parseFloat(editedBook.rating.toString()),
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
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Buch bearbeiten
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Titel"
              name="titel"
              value={editedBook.titel}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Preis"
              name="preis"
              type="number"
              value={editedBook.preis}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Art"
              name="art"
              value={editedBook.art}
              onChange={handleChange}
              margin="normal"
            >
              <MenuItem value="KINDLE">KINDLE</MenuItem>
              <MenuItem value="DRUCKAUSGABE">DRUCKAUSGABE</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Homepage"
              name="homepage"
              value={editedBook.homepage}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Bewertung"
              name="rating"
              type="number"
              value={editedBook.rating}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isJavaScript}
                    onChange={(e) => setIsJavaScript(e.target.checked)}
                    color="secondary"
                  />
                }
                label="JavaScript"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isTypeScript}
                    onChange={(e) => setIsTypeScript(e.target.checked)}
                    color="secondary"
                  />
                }
                label="TypeScript"
              />
            </FormGroup>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="contained" color="secondary" onClick={handleSave}>
            Speichern
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => onSave(book)}>
            Abbrechen
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export { BookEditForm };
