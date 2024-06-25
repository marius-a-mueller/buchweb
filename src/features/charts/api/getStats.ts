import { type FullBookType } from '@/components/form';
import { AxiosInstance, logger } from '@/util';
import { HttpStatusCode } from 'axios';

const getStats = async () => {
    const url = '/rest/';
    const response = await AxiosInstance.get(url);

    if (response.status !== (HttpStatusCode.Ok as number)) {
        return [];
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-underscore-dangle
    const books: FullBookType[] = response.data._embedded.buecher;
    logger.debug(`getStats: books=${JSON.stringify(books)}`);
    const ratings: number[] = [];

    for (const book of books) {
        ratings.push(book.rating);
    }
    return ratings;
};

export { getStats };
