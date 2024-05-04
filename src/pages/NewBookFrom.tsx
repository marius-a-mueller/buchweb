import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

interface Book {
  isbn: string;
  rating: number;
  art: string;
  preis: number;
  rabatt: number;
  lieferbar: boolean;
  datum: string;
  homepage: string;
  schlagwoerter: string[];
  titel: string;
}

const NewBookForm = () => {
  const [book, setBook] = useState<Book>({
    isbn: '',
    rating: 0,
    art: '',
    preis: 0,
    rabatt: 0,
    lieferbar: false,
    datum: '',
    homepage: '',
    schlagwoerter: [],
    titel: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setBook((prev) => ({
        ...prev,
        schlagwoerter: checked
          ? [...prev.schlagwoerter, name]
          : prev.schlagwoerter.filter(keyword => keyword !== name)
      }));
    } else if (name === 'lieferbar') {
      setBook((prev) => ({ ...prev, [name]: checked }));
    } else {
      setBook((prev) => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
    }
    validateField(name, value);
  };


  const validateField = (name: string, value: string) => {
    let errorMsg = '';
    if (!value) errorMsg = 'Dieses Feld ist erforderlich';
    if (name === 'isbn' && value && !/^\d{10,13}$/.test(value)) errorMsg = 'Muss eine gültige ISBN sein (10 oder 13 Ziffern)';
    if (name === 'rating' && (parseFloat(value) < 0 || parseFloat(value) > 5)) errorMsg = 'Bewertung muss zwischen 0 und 5 liegen';
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!Object.values(errors).some(x => x) && Object.values(book).every(x => x)) {
      console.log('Buch gespeichert:', book);
    } else {
      console.log('Bitte korrigieren Sie die Fehler im Formular.');
    }
  };

  return (
    <Paper style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <Typography variant="h6" component="h2">
        Neues Buch hinzufügen
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="ISBN"
              name="isbn"
              value={book.isbn}
              onChange={handleChange}
              error={!!errors.isbn}
              helperText={errors.isbn || '10 oder 13 Ziffern'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Titel"
              name="titel"
              value={book.titel}
              onChange={handleChange}
              error={!!errors.titel}
              helperText={errors.titel || 'Titel des Buches'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              required
              label="Bewertung"
              name="rating"
              value={book.rating}
              onChange={handleChange}
              error={!!errors.rating}
              helperText={errors.rating || '0 bis 5'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              required
              label="Preis"
              name="preis"
              value={book.preis}
              onChange={handleChange}
              error={!!errors.preis}
              helperText={errors.preis || 'Gesamtpreis des Buches'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              required
              label="Rabatt"
              name="rabatt"
              value={book.rabatt}
              onChange={handleChange}
              error={!!errors.rabatt}
              helperText={errors.rabatt || 'Rabatt in Prozent'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              required
              label="Erscheinungsdatum"
              name="datum"
              value={book.datum}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              helperText={errors.datum || 'Datum im Format YYYY-MM-DD'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Homepage"
              name="homepage"
              value={book.homepage}
              onChange={handleChange}
              error={!!errors.homepage}
              helperText={errors.homepage || 'URL der Buch-Homepage'}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Buch hinzufügen
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default NewBookForm;
