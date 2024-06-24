import { logger } from '@/util';
import { AxiosInstance } from '@/util/AxiosInstance';
import { HttpStatusCode } from 'axios';

const getStats = async () => {
    const url = '/rest/';

    const response = await AxiosInstance.get(url);

    if (response.status !== (HttpStatusCode.Ok as number)) {
        return [];
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-underscore-dangle
    const books = response.data._embedded.buecher;

    const ratings: number[] = [];

    logger.info('Fetched books: ', books);
    for (const book in books) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        ratings.push(books[book].rating);
    }
    return ratings;
};

export { getStats };
