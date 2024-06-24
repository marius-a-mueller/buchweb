/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type FullBookType } from '@/components/form';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { EditBookForm } from '@/features/edit';
import { logger } from '@/util';
import { AxiosInstance } from '@/util/axiosInstance';
import { LocalOffer as LocalOfferIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Rating,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetailView = () => {
  const { id = 'default' } = useParams<{ id: string }>();
  const [book, setBook] = useState<FullBookType | undefined>();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [, setEditedBook] = useState<FullBookType | undefined>();
  const [etag, setEtag] = useState<string | undefined>();
  const { token, isLoggedIn } = useAuth();
  logger.info(id);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await AxiosInstance.get(`/rest/${id}`, {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Accept: '*/*',
          },
        });
        logger.info(response);
        logger.info(`etag ${response.headers.etag}`);
        const tempBook: FullBookType = {
          isbn: response.data.isbn,
          titel: {
            titel: response.data.titel.titel,
            untertitel: response.data.titel.untertitel,
          },
          preis: response.data.preis,
          rabatt: response.data.rabatt,
          art: response.data.art,
          rating: response.data.rating,
          lieferbar: response.data.lieferbar,
          datum: response.data.datum,
          homepage: response.data.homepage,
          schlagwoerter: response.data.schlagwoerter,
        };
        setBook(tempBook);
        setEditedBook(tempBook);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setEtag(response.headers.etag);
      } catch (err) {
        console.error('Error fetching book details:', err);
      } finally {
        setLoading(false);
      }
    };

    // eslint-disable-next-line no-void
    void fetchBook();
  }, [id, token]);

  const handleSave = (updatedBook: FullBookType, newEtag: string | null) => {
    setBook(updatedBook);
    setEtag(newEtag ?? undefined);
    setEditMode(false);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!book) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h5">
          Buchdetails konnten nicht geladen werden.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 3 }} data-cy="book-detail">
        {editMode ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setEditMode(false)}
              sx={{ mt: 2 }}
            >
              Zurück
            </Button>
            <EditBookForm id={id} book={book} onSave={handleSave} etag={etag} />
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box
                  component="img"
                  sx={{
                    width: '100%',
                    borderRadius: 1,
                  }}
                  src={`https://via.placeholder.com/150?text=${book.titel.titel}`}
                  alt={`Cover von ${book.titel.titel}`}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    color: 'secondary',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {book.titel.titel}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {book.titel.untertitel}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ISBN: {book.isbn}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Preis: {book.preis} €
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Art: {book.art}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bewertung:
                  <Rating
                    name="book-rating"
                    value={Number.parseFloat(book.rating.toString())}
                    readOnly
                    precision={0.5}
                    sx={{
                      fontSize: '1.5rem',
                      verticalAlign: 'middle',
                      ml: 0.5,
                    }}
                  />
                  ({book.rating}/5)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lieferbar: {book.lieferbar ? 'Ja' : 'Nein'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Erscheinungsdatum: {book.datum?.toLocaleLowerCase()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Homepage:{' '}
                  <a
                    href={book.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {book.homepage}
                  </a>
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  Schlagwörter:
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {book.schlagwoerter.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      icon={<LocalOfferIcon />}
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
                {isLoggedIn() && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setEditMode(true)}
                    sx={{ mt: 2 }}
                    data-cy="edit-button"
                  >
                    Bearbeiten
                  </Button>
                )}
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </Container>
  );
};

export { BookDetailView };
