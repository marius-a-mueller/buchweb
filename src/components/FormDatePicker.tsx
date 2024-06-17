import { Typography } from '@mui/material';
import { DatePickerProps, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type RhfDatePickerProps = {
  name: string;
  label: string;
} & Partial<DatePickerProps<Dayjs, false>>;

const FormDatePicker: FC<RhfDatePickerProps> = ({
  name,
  label,
  ...otherProps
}) => {
  const [date, setDate] = useState<Dayjs | null | undefined>(null);
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  const value = dayjs(getValues(name) as Date);
  useEffect(() => {
    register(name);
  }, [register, name]);
  useEffect(() => {
    setDate(value || null);
  }, [setDate, value]);
  return (
    <>
      <MobileDatePicker
        value={date}
        label={label}
        onChange={(date) =>
          setValue(name, date?.toISOString().split('T')[0], {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
        {...otherProps}
      />
      {errors[name] && (
        <Typography color="error">
          {errors[name]?.message?.toString()}
        </Typography>
      )}
    </>
  );
};

export { FormDatePicker };
