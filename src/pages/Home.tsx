import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Grid, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { Link } from 'react-router-dom';
import { MenuDropdown } from '@/features/ui/header/MenuDropdown';
import { useAuth } from '@/features/auth';

const Home = () => {
  const { isLoggedIn } = useAuth();
  const props = useParams();
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Willkommen auf unserer Homepage
        </Typography>
        <h2>{props.bookId}</h2>
      </Box>

      <Grid container spacing={2} sx={{ mt: 4 }} justifyContent="center">
        <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '100%',
              border: 1,
              borderRadius: 1,
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textAlign: 'center', marginBottom: '8px' }}
            >
              Suche
            </Typography>
            <SearchIcon />
            <Typography
              variant="body2"
              color="textSecondary"
              gutterBottom
              sx={{ textAlign: 'center', mt: 1, flexGrow: 1 }}
            >
              Stöbere in unserem riesigen Katalog und finde das Buch, das du
              schon immer lesen wolltest. Nutze die leistungsstarke
              Suchfunktion, um nach Titel, Autor oder Genre zu suchen.
            </Typography>
            <Link
              to={'search'}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                textDecoration: 'none',
              }}
            >
              <Button
                color="secondary"
                variant="outlined"
                sx={{ maxWidth: 200 }}
                data-cy="mehrDazu_Suche"
              >
                Mehr dazu
              </Button>
            </Link>
          </Box>
        </Grid>
        {isLoggedIn() ? (
          <Grid item xs={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%',
                border: 1,
                borderRadius: 1,
                p: 2,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ textAlign: 'center', marginBottom: '8px' }}
              >
                Neues Buch
              </Typography>
              <AutoStoriesIcon />
              <Typography
                variant="body2"
                color="textSecondary"
                gutterBottom
                sx={{ textAlign: 'center', mt: 1, flexGrow: 1 }}
              >
                Kreiere dein eigenes literarisches Meisterwerk! Lege ein neues
                Buch an und fülle es mit deinen Ideen, Geschichten und
                Abenteuern.
              </Typography>
              <Link
                to={'new'}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  textDecoration: 'none',
                }}
              >
                <Button
                  color="secondary"
                  variant="outlined"
                  sx={{ maxWidth: 200 }}
                  data-cy="mehrDazu_Buch"
                >
                  Mehr dazu
                </Button>
              </Link>
            </Box>
          </Grid>
        ) : null}

        <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '100%',
              border: 1,
              borderRadius: 1,
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textAlign: 'center', marginBottom: '8px' }}
            >
              Diagramme
            </Typography>
            <EqualizerIcon />
            <Typography
              variant="body2"
              color="textSecondary"
              gutterBottom
              sx={{ textAlign: 'center', mt: 1, flexGrow: 1 }}
            >
              Erhalte Einblicke in die Lesegewohnheiten unserer Nutzer mit
              unseren interaktiven Charts. Entdecke Trends, beliebte Genres und
              vieles mehr!
            </Typography>
            <MenuDropdown label="Mehr dazu" data-cy="mehrDazu_Diagramm" />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export { Home };
