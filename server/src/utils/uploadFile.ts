import { createWriteStream } from 'fs';
import { Stream } from 'stream';

export const uploadFile = async (
    createReadStream: () => Stream,
    filename: string
) : Promise<boolean> => {
    return new Promise(async (resolve, reject) => 
        createReadStream()
            .pipe(createWriteStream(filename))
            .on('finish', () => resolve(true))
            .on('error', () => reject(false))
    )
}