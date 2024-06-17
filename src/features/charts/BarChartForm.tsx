import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Typography, Paper, useMediaQuery, useTheme } from '@mui/material';
import { getStats } from './api/getStats';
import { useState, useEffect } from 'react';

const BarChartForm = () => {
  const [ratings, setRatings] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const tempRatings = await getStats();
        console.log('Fetched ratings: ', tempRatings);
        setRatings(tempRatings);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, []);

  const countRating = (i: number) => {
    let count = 0;
    for (const rating of ratings) {
      if (rating === i) {
        count++;
      }
    }
    return count;
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box width="500px" p={3}>
        <Paper
          variant="outlined"
          sx={{
            padding: 2,
            marginBottom: 2,
            borderColor: 'grey.400',
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            BarChart for Books
          </Typography>
          <BarChart
            xAxis={[
              {
                label: 'Bewertungen',
                scaleType: 'band',
                data: ['1', '2', '3', '4', '5'],
              },
            ]}
            yAxis={[
              {
                label: 'Anzahl Bewertungen',
                scaleType: 'linear',
                tickMinStep: 1,
              },
            ]}
            loading={loading}
            series={[
              {
                data: [
                  countRating(1),
                  countRating(2),
                  countRating(3),
                  countRating(4),
                  countRating(5),
                ],
              },
            ]}
            width={isDesktop ? 400 : 300}
            height={300}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export { BarChartForm };
