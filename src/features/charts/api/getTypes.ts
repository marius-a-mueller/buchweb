import { AxiosInstance, logger } from '@/util';
import { HttpStatusCode } from 'axios';

const getTypes = async () => {
    const url = '/rest/';

    const response = await AxiosInstance.get(url);

    if (response.status !== (HttpStatusCode.Ok as number)) {
        return [];
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-underscore-dangle
    const books = response.data._embedded.buecher;

    const types: string[] = [];

    logger.info('Fetched books: ', books);
    for (const book in books) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        types.push(books[book].art);
    }
    return types;
};

export { getTypes };
