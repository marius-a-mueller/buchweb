import { logger } from '@/util';
import { AxiosInstance } from '@/util/AxiosInstance';

const getStats = async () => {
  const url = '/rest/';

  const response = await AxiosInstance.get(url);

  if (response.status !== 200) return [];
  const books = response.data._embedded.buecher;

  const ratings: number[] = [];

  logger.info('Fetched books: ', books);
  for (const book in books) {
    ratings.push(books[book].rating);
  }
  return ratings;
};

export { getStats };
