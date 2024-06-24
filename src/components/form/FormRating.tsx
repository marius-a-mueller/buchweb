import { Rating, RatingProps, Typography } from '@mui/material';
import { FC } from 'react';
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
            value={field.value}
            onChange={(_, value) => field.onChange(value !== null ? value : 0)}
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
