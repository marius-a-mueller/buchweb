/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/naming-convention */
import { AxiosInstance, logger } from '@/util';

interface DeleteBookProps {
    id: string;
    token: string;
}

const deleteBook = async ({ id, token }: DeleteBookProps) => {
    logger.debug(`deleteBook: id=${JSON.stringify(id)}`);
    const url = `/rest/${id}`;
    const response = await AxiosInstance.delete(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    logger.debug(`deleteBook: response=${JSON.stringify(response)}`);
    return response;
};

export { deleteBook };
