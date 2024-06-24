/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { AxiosInstance, logger } from '@/util';
import { HttpStatusCode } from 'axios';
import { type BookTableRow } from '../bookTable';

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
        searchValue: string | boolean | number,
    ) =>
        searchValue
            ? `${apiUrl}${apiUrl.includes('?') ? '&' : '?'}${searchTerm}=${searchValue}`
            : apiUrl;

    searchProps.forEach((param) => {
        url = appendSearchTerm(url, param.term, param.value);
    });

    const response = await AxiosInstance.get(url);

    if (response.status !== (HttpStatusCode.Ok as number)) {
        return [];
    }
    // eslint-disable-next-line no-underscore-dangle
    const books = response.data._embedded.buecher;

    const rows: BookTableRow[] = [];
    logger.info('Fetched books: ', books);
    for (const book in books) {
        rows.push({
            // eslint-disable-next-line no-underscore-dangle
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
