import { v4 } from 'uuid';
import { Upload } from '../types';
import { uploadFile } from './uploadFile';
import path from 'path';

export const createMessage= async (
    chatId: number,
    uid: number | undefined,
    file: Upload,
    text: string
) : Promise<[string, any[]]> => {

    let replacements: any[];
    let query: string;

    if(file) {
        const photo = 'MESSAGE-' + v4() + path.extname(file.filename);
        const pathname = path.join(__dirname, `../../images/${photo}`);

        await uploadFile(file.createReadStream, pathname);
        
        replacements = [chatId, uid, photo];

        query = `
            insert into message ("chatId", "userId", photo)
            values ($1, $2, $3)
        `;
    }
    
    else {
        replacements = [chatId, uid, text];

        query = `
            insert into message ("chatId", "userId", text)
            values ($1, $2, $3)
        `;
    }

    return [query, replacements];

}