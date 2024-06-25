import { type FullBookType } from '@/components/form';
import { AxiosInstance, logger } from '@/util';
import { HttpStatusCode } from 'axios';

const getTypes = async () => {
    const url = '/rest/';
    const response = await AxiosInstance.get(url);

    if (response.status !== (HttpStatusCode.Ok as number)) {
        return [];
    }
    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-unsafe-assignment
    const books: FullBookType[] = response.data._embedded.buecher;
    logger.debug(`getTypes: books=${JSON.stringify(books)}`);
    const types: string[] = [];

    for (const book of books) {
        types.push(book.art);
    }
    return types;
};

export { getTypes };
