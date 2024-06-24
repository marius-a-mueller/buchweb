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

type RhfDatePickerProps = {
  name: string;
  label: string;
} & Partial<DatePickerProps<Dayjs>>;

const FormDatePicker: FC<RhfDatePickerProps> = ({
  name,
  label,
  ...otherProps
}) => {
  const [date, setDate] = useState<Dayjs | undefined>();

  const { register, getValues, setValue } = useFormContext();
  useEffect(() => {
    register(name);
  }, [register, name]);
  useEffect(() => {
    const value = getValues(name) as string;
    if (!value || value.length === 0) {
      setDate(undefined);
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
          field: { clearable: true, onClear: () => setDate(undefined) },
        }}
        onChange={(val) => {
          try {
            setValue(name, val ? val.toISOString().split('T')[0] : undefined, {
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
