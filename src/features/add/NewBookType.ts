import { boolean, nullable, number, object, string, TypeOf, union } from 'zod';

const newBookSchema = object({
  isbn: string().regex(
    /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
    'Kein gültiges ISBN-Format (z.B. 978-0-007-00644-1)'
  ),
  titel: object({
    titel: string().min(1, 'Titel ist erforderlich'),
    untertitel: string(),
  }),
  art: string().min(1, 'Art ist erforderlich'),
  rating: number(),
  preis: number().min(0.01, 'Preis muss positiv sein'),
  rabatt: number().min(0),
  datum: nullable(string()),
  homepage: union([
    string().regex(
      new RegExp(
        '^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?'
      ),
      'Ungültige URL'
    ),
    string().min(1),
  ]),
  lieferbar: boolean(),
  schlagwoerter: string().array(),
});

const newBookDefaultValues: newBookType = {
  isbn: '',
  titel: { titel: '', untertitel: '' },
  rating: 0,
  art: '',
  preis: 0.01,
  rabatt: 0,
  lieferbar: false,
  datum: null,
  homepage: '',
  schlagwoerter: [],
};

type newBookType = TypeOf<typeof newBookSchema>;

export { newBookSchema, newBookDefaultValues };
export type { newBookType };
