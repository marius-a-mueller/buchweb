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
        <Box
          sx={{
            width: 135,
            height: 100,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'grey',
            bgcolor: 'transparent',
            marginRight: '580px',
            marginBottom: '10px',
          }}
        >
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked color="secondary"/>} label="JavaScript" />
            <FormControlLabel control={<Checkbox defaultChecked color="secondary"/>} label="TypeScript" />
          </FormGroup>
        </Box>
        <div>
      <FormControl sx={{marginRight: '620px' }}>
        <InputLabel id="demo-simple-select-autowidth-label">Art</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={art}
          onChange={handleChange}
          autoWidth
          label="Age"
        >
          <MenuItem value={1}>Kindle</MenuItem>
          <MenuItem value={2}>Druckausgabe</MenuItem>
        </Select>
      </FormControl>
    </div>
        <Button variant="contained" color="secondary" startIcon={<SearchIcon />} sx={{ marginTop: '10px' }}>
          Suche
        </Button>
      </div>
    </Box>
  );
};

export default Search;