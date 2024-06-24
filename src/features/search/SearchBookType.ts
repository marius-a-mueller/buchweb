import { boolean, number, object, string, TypeOf } from 'zod';

const searchBookSchema = object({
  isbn: string()
    .regex(
      /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
      'Kein gültiges ISBN-Format (z.B. 978-0-007-00644-1)'
    )
    .or(string()),
  titel: object({
    titel: string(),
  }),
  druckausgabe: boolean(),
  kindle: boolean(),
  rating: number(),
  schlagwoerter: string().array(),
}).refine((val) => val.druckausgabe || val.kindle, {
  message: 'Mindestens eine Ausgabe muss ausgewählt sein',
  path: ['kindle'],
});

const defaultValues: searchBookType = {
  isbn: '',
  titel: { titel: '' },
  rating: 0,
  druckausgabe: true,
  kindle: true,
  schlagwoerter: [],
};

type searchBookType = TypeOf<typeof searchBookSchema>;

export { searchBookSchema, defaultValues as searchBookDefaultValues };
export type { searchBookType };
