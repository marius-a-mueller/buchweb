import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type DatePickerParams = {
  name: string;
  label: string;
};

const FormDatePicker: FC<DatePickerParams> = ({
  name,
  label,
  ...otherParams
}) => {
  const [date, setDate] = useState<Dayjs | null | undefined>(null);
  const { register, getValues, setValue } = useFormContext();
  const value = dayjs(getValues(name) as Date);
  useEffect(() => {
    register('fieldName');
  }, [register]);
  useEffect(() => {
    setDate(value || null);
  }, [setDate, value]);
  return (
    <MobileDatePicker
      value={date}
      label={label}
      onChange={(date) =>
        setValue(name, date, { shouldValidate: true, shouldDirty: true })
      }
      {...otherParams}
    />
  );
};

export { FormDatePicker };
