import Box from '@mui/material/Box';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

export const Search = () => {
  const [art, setArt] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setArt(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '80ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Suchformular</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          id="isbn-input"
          label="ISBN"
          defaultValue="ISBN"
          sx={{ width: '80ch', textAlign: 'center' }}
        />
        <TextField
          id="title-input"
          label="Titel"
          defaultValue="Titel"
          sx={{ width: '80ch', textAlign: 'center' }}
        />
        <TextField
          id="rating-input"
          label="Rating"
          defaultValue="Rating"
          sx={{ width: '80ch', textAlign: 'center' }}
        />
        <Box sx={{ width: '80ch', textAlign: 'center' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Art</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={art}
          label="Art"
          onChange={handleChange}
        >
          <MenuItem value={1}>Kindle</MenuItem>
          <MenuItem value={2}>Druckausgabe</MenuItem>
        </Select>
      </FormControl>
    </Box>
        <Box
          sx={{
            width: 135,
            height: 100,
            borderRadius: 1,
            border: '1px solid',
            borderColor: '#c2c2c2',
            bgcolor: 'transparent',
            marginRight: '580px',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked color="secondary"/>} label="JavaScript" />
            <FormControlLabel control={<Checkbox defaultChecked color="secondary"/>} label="TypeScript" />
          </FormGroup>
        </Box>
        <Button variant="contained" color="secondary" startIcon={<SearchIcon />} sx={{ marginTop: '10px' }}>
          Suche
        </Button>
      </div>
    </Box>
  );
};

export default Search;
