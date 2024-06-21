import { logger } from '@/util';
import { AxiosInstance } from '@/util/AxiosInstance';

const getTypes = async () => {
  const url = '/rest/';

  const response = await AxiosInstance.get(url);

  if (response.status !== 200) return [];
  const books = response.data._embedded.buecher;

  const types: string[] = [];

  logger.info('Fetched books: ', books);
  for (const book in books) {
    types.push(books[book].art);
  }
  return types;
};

export { getTypes };
