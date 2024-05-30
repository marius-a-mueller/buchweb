import { BookTableRow } from '../BookTable';
import { AxiosInstance } from '@/util/AxiosInstance';

interface SearchParameter {
  term: string;
  value: string | boolean | number;
}

interface SearchBooksProps {
  searchProps: SearchParameter[];
}

const searchBooks = async (props: SearchBooksProps) => {
  const { searchProps } = props;
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

  searchProps.forEach((param) => {
    url = appendSearchTerm(url, param.term, param.value);
  });

  const response = await AxiosInstance.get(url);

  if (response.status !== 200) return [];
  const books = response.data._embedded.buecher;

  const rows: BookTableRow[] = [];
  console.log('Fetched books: ', books);
  for (const book in books) {
    rows.push({
      id: books[book]._links.self.href.split('/').pop(),
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
export type { SearchBooksProps };
