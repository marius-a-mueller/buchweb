import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import 'dayjs/locale/de';

type RhfDatePickerProps = {
  name: string;
  label: string;
} & Partial<DatePickerProps<Dayjs, false>>;

const FormDatePicker: FC<RhfDatePickerProps> = ({
  name,
  label,
  ...otherProps
}) => {
  const [date, setDate] = useState<Dayjs | null>(null);

  const { register, getValues, setValue } = useFormContext();
  useEffect(() => {
    register(name);
  }, [register, name]);
  useEffect(() => {
    const value = getValues(name) as string;
    if (value.length === 0) {
      setDate(null);
    } else {
      setDate(dayjs(value));
    }
  }, [setDate, getValues, name]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <DatePicker
        value={date}
        disableFuture
        label={label}
        slotProps={{
          field: { clearable: true, onClear: () => setDate(null) },
        }}
        onChange={(date) => {
          try {
            setValue(name, date?.toISOString().split('T')[0], {
              shouldDirty: true,
              shouldValidate: true,
            });
            // eslint-disable-next-line no-empty
          } catch (_) {}
        }}
        {...otherProps}
      />
    </LocalizationProvider>
  );
};

export { FormDatePicker };
