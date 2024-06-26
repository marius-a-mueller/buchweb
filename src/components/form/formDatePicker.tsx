// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import {
  DatePicker,
  LocalizationProvider,
  type DatePickerProps,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { type Dayjs } from 'dayjs';
import 'dayjs/locale/de';
import { useEffect, useState, type FC } from 'react';
import { useFormContext } from 'react-hook-form';

const DATE_FORMAT = 'YYYY-MM-DD';

type RhfDatePickerProps = {
  name: string;
  label: string;
} & Partial<DatePickerProps<Dayjs>>;

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
    if (!value || value.length === 0) {
      setDate(null);
    } else {
      setDate(dayjs(value, DATE_FORMAT));
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
        onChange={(val) => {
          try {
            setValue(name, val ? val.format(DATE_FORMAT) : undefined, {
              shouldDirty: true,
              shouldValidate: true,
            });
            // eslint-disable-next-line no-empty
          } catch {}
        }}
        {...otherProps}
      />
    </LocalizationProvider>
  );
};

export { FormDatePicker };
