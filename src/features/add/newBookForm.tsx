import { FullBookForm } from '@/components/form';
import { logger } from '@/util';
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
import { searchBooks } from '../search/api/searchBooks';
import { addBook } from './api/addBook';

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
          logger.debug(`submitNewBook: response=${JSON.stringify(response)}`);
          navigate(`/buchweb/book/${response[0].id}`);
        } catch (err) {
          logger.error('submitNewBook: error=', err);
        }
      }}
    />
  );
};

export { NewBookForm };
