import { FC } from 'react';
import { FullBookForm, fullBookType } from '@/components/form';
import { useAuth } from '../auth';
import { editBook } from './api/editBook';
import { logger } from '@/util';

type EditBookFormProps = {
  id: string;
  book: fullBookType;
  etag: string | null;
  onSave: (updatedBook: fullBookType, etag: string | null) => void;
};

const EditBookForm: FC<EditBookFormProps> = ({
  id,
  book,
  etag,
  onSave,
}: EditBookFormProps) => {
  const { token } = useAuth();

  return (
    <FullBookForm
      defaultValues={book}
      onHandleSubmit={async (values) => {
        logger.info('values: ' + JSON.stringify(values));
        try {
          const response = await editBook({ id, book: values, token, etag });

          const newEtag = response.headers.etag;
          logger.info('New ETAG: ' + newEtag);
          onSave(values, newEtag);
        } catch (error) {
          console.error('Error updating book details:', error);
        }
      }}
    />
  );
};

export { EditBookForm };
