import { BookTableRow } from '../BookTable';
import { AxiosInstance } from '@/util/AxiosInstance';

interface SearchParameter {
  term: string;
  value: string | boolean | number;
}

interface SearchBooksParams {
  searchParams: SearchParameter[];
}

const searchBooks = async (props: SearchBooksParams) => {
  const { searchParams } = props;
  let url = '/rest/';

  const appendSearchTerm = (
    apiUrl: string,
    searchTerm: string,
    searchValue: string | boolean | number
  ) => {
    return searchValue
      ? `${apiUrl}${apiUrl.includes('?') ? '&' : '?'}${searchTerm}=${searchValue}`
      : apiUrl;
  };

  searchParams.forEach((param) => {
    url = appendSearchTerm(url, param.term, param.value);
  });

  const response = await AxiosInstance.get(url);

  if (response.status !== 200) return [];
  const books = response.data._embedded.buecher;

  const rows: BookTableRow[] = [];
  console.log('Fetched books: ', books);
  for (const book in books) {
    rows.push({
      id: books[book]._links.self.href.split('/').pop() as number,
      isbn: books[book].isbn,
      title: books[book].titel.titel,
      type: books[book].art,
      rating: books[book].rating,
      inStock: books[book].lieferbar,
      price: books[book].preis,
    });
  }
  return rows;
};

export { searchBooks };
export type { SearchBooksParams };
