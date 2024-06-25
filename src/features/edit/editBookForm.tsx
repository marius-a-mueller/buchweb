import { FullBookForm, type FullBookType } from '@/components/form';
import { logger } from '@/util';
import { type FC } from 'react';
import { useAuth } from '../auth';
import { editBook } from './api/editBook';

interface EditBookFormProps {
  id: string;
  book: FullBookType;
  etag: string | undefined;
  onSave: (updatedBook: FullBookType, etag: string | null) => void;
}

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
        logger.debug(`EditBookForm: values=${JSON.stringify(values)}`);
        try {
          const response = await editBook({ id, book: values, token, etag });

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const newEtag = response.headers.etag;
          logger.debug(`EditBookForm: newEtag=${newEtag}`);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          onSave(values, newEtag);
        } catch (err) {
          logger.error('EditBookForm: Error updating book details:', err);
        }
      }}
    />
  );
};

export { EditBookForm };
