import { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Grid, Typography, Paper, Container, FormGroup, FormControlLabel, Checkbox, CircularProgress } from '@mui/material';
import { AxiosInstance } from '@/util/AxiosInstance';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface BookDetailProps {
  id: number;
  isbn: string;
  titel: {
    titel: string;
    untertitel: string;
  };
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
  const [loading, setLoading] = useState(false);

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
    if (name === 'titel' || name === 'untertitel') {
      setEditedBook(prev => ({
        ...prev,
        titel: {
          ...prev.titel,
          [name]: value,
        },
      }));
    } else {
      setEditedBook(prev => ({
        ...prev,
        [name]: name === 'lieferbar' ? value === 'true' : (name === 'rating' ? parseFloat(value) : value),
      }));
    }
  };


  const handleSave = async () => {
    setLoading(true);
    console.log("ETag before save:", etag);

    try {
      const response = await AxiosInstance.put(
        `/rest/${book.id}`,
        {
          ...editedBook,
          titel: {
            titel: editedBook.titel.titel,
            untertitel: editedBook.titel.untertitel,
          },
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
      console.log('Request data:', {
        ...editedBook,
        titel: {
          titel: editedBook.titel.titel,
          untertitel: editedBook.titel.untertitel,
        },
        preis: parseFloat(editedBook.preis.toString()),
        rating: parseFloat(editedBook.rating.toString()),
      });
  
      console.log('Response:', response.data);
      const newEtag = response.headers['etag'] || response.headers['ETag'];
      setTimeout(() => {
      onSave({ ...editedBook, etag: newEtag });
      setEtag(newEtag);
      setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error updating book details:', error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4, position: 'relative' }}>
        <Typography variant="h4" gutterBottom align="center">
          Buch bearbeiten
        </Typography>
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
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
      <Box sx={{ display: loading ? 'none' : 'block' }}></Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Titel"
              name="titel"
              value={editedBook.titel.titel}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Untertitel"
              name="untertitel"
              value={editedBook.titel.untertitel}
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
              inputProps={{ min: 0, max: 5 }}
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
          <Button variant="contained" color="secondary" onClick={handleSave} disabled={loading}>
            Speichern
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => onSave(book)} disabled={loading}>
            Abbrechen
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export { BookEditForm };
