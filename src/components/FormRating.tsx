import { Rating } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type RatingProps = {
  name: string;
};

const FormRating: FC<RatingProps> = ({ name }) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Rating
          name={name}
          value={Number(field.value)}
          onChange={(_, value) => field.onChange(value)}
        />
      )}
    />
  );
};

export { FormRating };
