import { type FullBookType } from '@/components/form';
import { AxiosInstance, logger } from '@/util';
import { HttpStatusCode } from 'axios';

interface AddBookProps {
  book: FullBookType;
  token: string;
}

const addBook = async ({ book, token }: AddBookProps) => {
  logger.debug(`addBook: book=${JSON.stringify(book)}`);
  const url = '/rest/';
  const response = await AxiosInstance.post(url, book, {
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${token}`,
    },
  });

  logger.debug('Response: ', response);
  if (response.status !== (HttpStatusCode.Created as number)) {
    throw new Error(`addBook: Unexpected status code: ${response.status}`);
  }
};

export { addBook };
