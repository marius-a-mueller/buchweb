/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FullBookType } from '@/components/form';
import { AxiosInstance, logger } from '@/util';

interface EditBookProps {
    id: string;
    book: FullBookType;
    token: string;
    etag: string | undefined;
}

const editBook = async ({ id, book, token, etag }: EditBookProps) => {
    logger.debug(`editBook: book=${JSON.stringify(book)}`);
    const url = `/rest/${id}`;
    const response = await AxiosInstance.put(url, book, {
        headers: {
            Authorization: `Bearer ${token}`,
            'If-Match': etag ?? '',
        },
    });
    logger.debug(`editBook: response=${JSON.stringify(response)}`);
    return response;
};

export { editBook };
