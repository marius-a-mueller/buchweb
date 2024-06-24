import { type FullBookType } from '@/components/form';
import { logger } from '@/util';
import { AxiosInstance } from '@/util/axiosInstance';
import { HttpStatusCode } from 'axios';

interface AddBookProps {
  book: FullBookType;
  token: string;
}

const addBook = async ({ book, token }: AddBookProps) => {
  logger.info('Adding book: ', book);
  const url = '/rest/';
  const response = await AxiosInstance.post(url, book, {
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${token}`,
    },
  });

  logger.info('Response: ', response);
  if (response.status !== (HttpStatusCode.Created as number)) {
    throw new Error('Error adding book');
  }
};

export { addBook };
