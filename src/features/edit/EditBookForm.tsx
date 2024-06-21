import { FC } from 'react';
import { FullBookForm, fullBookType } from '@/components';
import { useAuth } from '../auth';
import { editBook } from './api/editBook';

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
        console.log('values: ' + JSON.stringify(values));
        try {
          const response = await editBook({ id, book: values, token, etag });

          const newEtag = response.headers.etag;
          console.log('New ETAG: ' + newEtag);
          onSave(values, newEtag);
        } catch (error) {
          console.error('Error updating book details:', error);
        }
      }}
    />
  );
};

export { EditBookForm };
