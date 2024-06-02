import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Paper, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Link } from 'react-router-dom';

const Home = () => {
  const props = useParams();
  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Willkommen auf unserer homepage
        </Typography>
        <h2>{props.bookId}</h2>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textAlign: 'center', marginRight: '8px' }}
            >
              Suche
            </Typography>
            <SearchIcon />
          </Box>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Stöbere in unserem riesigen Katalog und finde das Buch, das du schon
            immer lesen wolltest. Nutze die leistungsstarke Suchfunktion, um
            nach Titel, Autor oder Genre zu suchen.
          </Typography>
          <Link to={'search'}>
            <Button color="secondary" variant="outlined" fullWidth>
              Mehr dazu
            </Button>
          </Link>
        </Paper>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textAlign: 'center', marginRight: '8px' }}
            >
              Neues Buch
            </Typography>
            <AutoStoriesIcon />
          </Box>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Kreiere dein eigenes literarisches Meisterwerk! Lege ein neues Buch
            an und fülle es mit deinen Ideen, Geschichten und Abenteuern.
          </Typography>
          <Link to={'new'}>
            <Button color="secondary" variant="outlined" fullWidth>
              Mehr dazu
            </Button>
          </Link>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textAlign: 'center', marginRight: '8px' }}
            >
              Diagramme
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Erhalte Einblicke in die Lesegewohnheiten unserer Nutzer mit unseren
            interaktiven Charts. Entdecke Trends, beliebte Genres und vieles
            mehr!
          </Typography>

          <Button color="secondary" variant="outlined" fullWidth>
            Mehr dazu
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export { Home };
