import { fullBookType } from '@/components/form';
import { logger } from '@/util';
import { AxiosInstance } from '@/util/AxiosInstance';
import { HttpStatusCode } from 'axios';

type EditBookProps = {
  id: string;
  book: fullBookType;
  token: string;
  etag: string | null;
};

const editBook = async ({ id, book, token, etag }: EditBookProps) => {
  logger.info('Editing book: ', book);
  const url = `/rest/${id}`;
  const response = await AxiosInstance.put(url, book, {
    headers: {
      Authorization: `Bearer ${token}`,
      'If-Match': etag ? etag : '',
    },
  });

  logger.info('Response: ', response);
  return response;
  if (response.status !== HttpStatusCode.Created)
    throw new Error('Error adding book');
};

export { editBook };
