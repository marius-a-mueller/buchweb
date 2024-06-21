import { fullBookType } from '@/components';
import { AxiosInstance } from '@/util/AxiosInstance';
import { HttpStatusCode } from 'axios';

type EditBookProps = {
  id: string;
  book: fullBookType;
  token: string;
  etag: string | null;
};

const editBook = async ({ id, book, token, etag }: EditBookProps) => {
  console.log('Editing book: ', book);
  const url = `/rest/${id}`;
  const response = await AxiosInstance.put(url, book, {
    headers: {
      Authorization: `Bearer ${token}`,
      'If-Match': etag ? etag : '',
    },
  });

  console.log('Response: ', response);
  return response;
  if (response.status !== HttpStatusCode.Created)
    throw new Error('Error adding book');
};

export { editBook };
