import { useAuth } from '@/features/auth';
import { MenuDropdown } from '@/features/ui/header/menuDropdown';
import { AutoStories, Equalizer, Search } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

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
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding:3,
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '100%',
              border: 1,
              borderRadius: 1,
              p: 2,
              '&:hover': {
                boxShadow: 10,
              },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textAlign: 'center', marginBottom: '8px' }}
            >
              Suche
            </Typography>
            <Search />
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
          </Paper>
        </Grid>
        {isLoggedIn() ? (
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%',
                border: 1,
                borderRadius: 1,
                p: 2,
                '&:hover': {
                  boxShadow: 10,
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ textAlign: 'center', marginBottom: '8px' }}
              >
                Neues Buch
              </Typography>
              <AutoStories />
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
            </Paper>
          </Grid>
        ) : undefined}

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '100%',
              border: 1,
              borderRadius: 1,
              p: 2,
              '&:hover': {
                boxShadow: 10,
              },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textAlign: 'center', marginBottom: '8px' }}
            >
              Diagramme
            </Typography>
            <Equalizer />
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
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export { Home };
