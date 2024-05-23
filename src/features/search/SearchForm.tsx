import { useEffect, useState } from 'react';
import { BookTableRow } from './BookTable';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import axios from 'axios';

interface SearchFormProps {
  setBookTableRows: (rows: BookTableRow[]) => void;
}

interface BookType {
  isbn: string;
  titel: string;
}

const SearchForm = (props: SearchFormProps) => {
  const { setBookTableRows } = props;
  const [art, setArt] = useState('');
  const [, setBooks] = useState<BookType[]>([]);
  const [searchIsbn, setSearchIsbn] = useState('');
  const [searchTitel, setSearchTitel] = useState('');
  const [selectedRatingOption, setSelectedRatingOption] = useState('');
  const [isJavaScript, setIsJavaScript] = useState(false);
  const [isTypeScript, setIsTypeScript] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setArt(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);

    try {
      let apiUrl = 'https://localhost:3000/rest';
      const searchParams = [
        { term: 'isbn', value: searchIsbn },
        { term: 'titel', value: searchTitel },
        { term: 'rating', value: selectedRatingOption },
        { term: 'art', value: art },
        { term: 'javascript', value: isJavaScript },
        { term: 'typescript', value: isTypeScript },
      ];

      const appendSearchTerm = (
        apiUrl: string,
        searchTerm: string,
        searchValue: string | boolean
      ) => {
        return searchValue
          ? `${apiUrl}${apiUrl.includes('?') ? '&' : '?'}${searchTerm}=${searchValue}`
          : apiUrl;
      };

      searchParams.forEach((param) => {
        apiUrl = appendSearchTerm(apiUrl, param.term, param.value);
      });

      const response = await axios.get(apiUrl);

      if (response.status !== 200) {
        throw new Error('Failed to fetch data');
      }

      const data = response.data;
      console.log('Fetched books:', data);
      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:3000/rest');
        if (response.status !== 200) {
          throw new Error('Failed to fetch data');
        }
        const data = response.data;
        console.log('Fetched books on load:', data);
        setBooks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Suchformular
      </h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          id="isbn-input"
          label="ISBN"
          value={searchIsbn}
          onChange={(e) => setSearchIsbn(e.target.value)}
          sx={{ width: '100%', textAlign: 'center' }}
        />
        <TextField
          id="title-input"
          label="Titel"
          value={searchTitel}
          onChange={(e) => setSearchTitel(e.target.value)}
          sx={{ width: '100%', textAlign: 'center' }}
        />
        <TextField
          id="rating-input"
          label="Rating"
          value={selectedRatingOption}
          onChange={(e) => setSelectedRatingOption(e.target.value)}
          sx={{ width: '100%', textAlign: 'center' }}
        />
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Art</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={art}
              label="Art"
              onChange={handleChange}
            >
              <MenuItem value={''}>Keine Auswahl</MenuItem>
              <MenuItem value={'KINDLE'}>Kindle</MenuItem>
              <MenuItem value={'DRUCKAUSGABE'}>Druckausgabe</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            //width: 135,
            //height: 100,
            borderRadius: 1,
            border: '1px solid',
            borderColor: '#c2c2c2',
            bgcolor: 'transparent',
            //marginRight: '580px',
            margin: '10px',
            padding: '10px',
            //marginBottom: '10px',
          }}
        >
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
        </Box>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<SearchIcon />}
          sx={{ marginBottom: '20px' }}
          onClick={handleSearch}
          disabled={loading}
        >
          Suche
        </Button>
      </div>
    </>
  );
};

export { SearchForm };
