import { FC } from 'react';
import { FullBookForm } from '@/components/form';
import { addBook } from './api/addBook';
import { useAuth } from '../auth';
import { searchBooks } from '../search/api/searchBooks';
import { useNavigate } from 'react-router-dom';
import { logger } from '@/util';

const NewBookForm: FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  return (
    <FullBookForm
      onHandleSubmit={async (values) => {
        try {
          await addBook({ book: values, token });
          const response = await searchBooks({
            searchProps: [{ term: 'isbn', value: values.isbn }],
          });
          logger.info(response);
          navigate(`/buchweb/book/${response[0].id}`);
        } catch (error) {
          console.error('Error adding book: ', error);
        }
      }}
    />
  );
};

export { NewBookForm };
