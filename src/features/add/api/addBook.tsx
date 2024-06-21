import { fullBookType } from '@/components';
import { logger } from '@/util';
import { AxiosInstance } from '@/util/AxiosInstance';
import { HttpStatusCode } from 'axios';

type AddBookProps = {
  book: fullBookType;
  token: string;
};

const addBook = async ({ book, token }: AddBookProps) => {
  logger.info('Adding book: ', book);
  const url = '/rest/';
  const response = await AxiosInstance.post(url, book, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  logger.info('Response: ', response);
  if (response.status !== HttpStatusCode.Created)
    throw new Error('Error adding book');
};

export { addBook };
