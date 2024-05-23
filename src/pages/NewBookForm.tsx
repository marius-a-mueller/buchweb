import React, { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';

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

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setBook((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    
  if (name === 'lieferbar') {
    setBook(prev => ({
      ...prev,
      [name]: checked 
    }));
    validateField(name, String(checked)); 
  } else if (type === "checkbox") {
    setBook(prev => ({
      ...prev,
      schlagwoerter: checked
        ? [...prev.schlagwoerter, name]
        : prev.schlagwoerter.filter(keyword => keyword !== name)
    }));
  } else {
    setBook(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
    validateField(name, value);
  }
};


const validateField = (name: string, value: string) => {
  let errorMsg = '';
  if (!value) errorMsg = 'Dieses Feld ist erforderlich';

  if (name === 'isbn') {
    const isbnPattern = /^(?:\d{10}|\d{13}|\d{3}-\d{1}-\d{3}-\d{5}-\d{1})$/;
    if (!isbnPattern.test(value)) {
      errorMsg = 'Muss eine gültige ISBN sein (10 oder 13 Ziffern, ggf. mit Trennzeichen)';
    }
  }

  if (name === 'rating' && (parseFloat(value) < 0 || parseFloat(value) > 5)) {
    errorMsg = 'Bewertung muss zwischen 0 und 5 liegen';
  }
  
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
    <Box
    component="form"
    sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      '& .MuiTextField-root': { m: 1, width: '80ch' },
      '& .MuiFormControl-root': { m: 1, width: '80ch' },
        '& .MuiButton-root': { m: 1, width: '80ch' },
        '& .MuiSwitch-root': { m: 1, width: '6ch' },
    }}
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit}
  >
    <Typography variant="h6" component="h2" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold', marginTop: "15px" }}>
      Neues Buch hinzufügen
    </Typography>
    <TextField
      label="ISBN"
      name="isbn"
      value={book.isbn}
      onChange={handleChange}
      error={!!errors.isbn}
      helperText={errors.isbn || '10 oder 13 Ziffern'}
      required
    />
    <TextField
      label="Titel"
      name="titel"
      value={book.titel}
      onChange={handleChange}
      error={!!errors.titel}
      helperText={errors.titel}
      required
    />
    <TextField
      label="Bewertung"
      type="number"
      name="rating"
      value={book.rating}
      onChange={handleChange}
      error={!!errors.rating}
      helperText={errors.rating || '0 bis 5'}
      required
    />
    <TextField
      label="Preis"
      type="number"
      name="preis"
      value={book.preis}
      onChange={handleChange}
      error={!!errors.preis}
      helperText={errors.preis}
      required
    />
    <TextField
      label="Rabatt"
      type="number"
      name="rabatt"
      value={book.rabatt}
      onChange={handleChange}
      error={!!errors.rabatt}
      helperText={errors.rabatt || 'Rabatt in Prozent'}
      required
    />
    <TextField
      label="Erscheinungsdatum"
      type="date"
      name="datum"
      value={book.datum}
      onChange={handleChange}
      InputLabelProps={{ shrink: true }}
      helperText={errors.datum}
      required
    />
    <TextField
      label="Homepage"
      name="homepage"
      value={book.homepage}
      onChange={handleChange}
      error={!!errors.homepage}
      helperText={errors.homepage || 'URL der Buch-Homepage'}
      required
    />
    <FormControl>
      <InputLabel id="art-label">Art</InputLabel>
      <Select
        labelId="art-label"
        id="art-select"
        name="art"
        value={book.art}
        onChange={handleSelectChange}
        label="Art"
      >
        <MenuItem value="Kindle">Kindle</MenuItem>
        <MenuItem value="Druckausgabe">Druckausgabe</MenuItem>
      </Select>
    </FormControl>
    <FormControlLabel 
  control={<Switch checked={book.lieferbar} onChange={handleChange} name="lieferbar" />}
  label="Lieferbar"
  labelPlacement="start"
  sx={{
    marginRight: 'auto',
  }}
/>
    <Button type="submit" variant="contained" color="secondary" startIcon={<LibraryBooksRoundedIcon />} sx={{ mt: 2 }}>
      Buch hinzufügen
    </Button>
  </Box>
);
};

export default NewBookForm;