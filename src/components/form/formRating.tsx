import { Rating, Typography, type RatingProps } from '@mui/material';
import { type FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type RhfRatingProps = {
  name: string;
  label: string;
} & Partial<RatingProps>;

const FormRating: FC<RhfRatingProps> = ({ name, label, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <Typography>{label}</Typography>
          <Rating
            name={name}
            value={field.value as number}
            onChange={(_, value) => field.onChange(value ?? 0)}
            {...otherProps}
          />
          {errors[name] && (
            <Typography color="error">
              {errors[name]?.message?.toString()}
            </Typography>
          )}
        </>
      )}
    />
  );
};

export { FormRating };
