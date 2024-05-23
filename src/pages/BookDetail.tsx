import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';

interface BookDetailProps {
  id: number;
  isbn: string;
  titel: string;
  preis: number;
  art: string;
  rating: number;
  lieferbar: boolean;
  datum: string;
  homepage: string;
  schlagwoerter: string[];
}

const BookDetail = () => {
  const { id = 'default' } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookDetailProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://localhost:3000/rest/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!book) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h5">Buchdetails konnten nicht geladen werden.</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Box>
        <Typography gutterBottom variant="h5" component="div">
          {book.titel}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Preis: {book.preis} €
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Art: {book.art}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Homepage: <a href={book.homepage} target="_blank" rel="noopener noreferrer">{book.homepage}</a>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bewertung: {book.rating}/5
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Lieferbar: {book.lieferbar ? 'Ja' : 'Nein'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Erscheinungsdatum: {new Date(book.datum).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Schlagwörter: {book.schlagwoerter.join(', ')}
        </Typography>
      </Box>
    </Box>
  );
};

export { BookDetail };
