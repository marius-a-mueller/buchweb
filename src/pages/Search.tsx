import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';


export const Search = () => {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '80ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <h1 style={{ textAlign: 'center' }}>Suchformular</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          id="isbn-input" // Eindeutige ID für das Textfeld
          label="ISBN"
          defaultValue="ISBN"
          sx={{ width: '80ch', textAlign: 'center' }}
        />
        <TextField
          id="title-input" // Eindeutige ID für das Textfeld
          label="Titel"
          defaultValue="Titel"
          sx={{ width: '80ch', textAlign: 'center' }}
        />
        <TextField
          id="rating-input" // Eindeutige ID für das Textfeld
          label="Rating"
          defaultValue="Rating"
          sx={{ width: '80ch', textAlign: 'center' }}
        />
        <Box
          sx={{

            width: 135,
            height: 100,
            borderRadius: 1,
            border: '1px solid', // Eine 1px dicke Umrandung
            borderColor: 'grey', // Umrandungsfarbe
            bgcolor: 'transparent', // Transparenter Hintergrund
            marginRight: '580px', // Seitenabstand hinzufügen
            marginBottom: '5px', // Unten Abstand hinzufügen
          }}
        >
          {/* Kommentar hinzufügen */}
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked color="secondary"/>} label="JavaScript" />
            <FormControlLabel control={<Checkbox defaultChecked color="secondary"/>} label="TypeScript" />
          </FormGroup>
        </Box>
        <Box
          sx={{

            width: 135,
            height: 100,
            borderRadius: 1,
            border: '1px solid', // Eine 1px dicke Umrandung
            borderColor: 'grey', // Umrandungsfarbe
            bgcolor: 'transparent', // Transparenter Hintergrund
            marginRight: '580px', // Seitenabstand hinzufügen
          }}
        >
          {/* Kommentar hinzufügen */}
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked color="secondary"/>} label="Druckausgabe" />
            <FormControlLabel control={<Checkbox defaultChecked color="secondary"/>} label="Kindle" />
          </FormGroup>
        </Box>
        <Button variant="contained" color="secondary" startIcon={<SearchIcon />}
         sx={{  textAlign: 'center', marginTop:'10px'}}>
          Suche
          </Button>
       </div>
    </Box>
  );
};

export default Search;
