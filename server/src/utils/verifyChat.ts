import { getConnection } from 'typeorm';
import { Member } from '../entities/Member';

export const verifyChat = async (
    recipients: number[],
    uid: number | undefined
) : Promise<number | undefined> => {
    const chats = await getConnection().query(
        `
            select c.* from chat as c
            inner join member as m on m."chatId" = c.id
            where c."isPrivate" = true
            and m."userId" = ${uid}
        `
    );

    for(let i=0;i<chats.length;i++) {
        const chatId = chats[i].id;
        let exists = true;

        for(let i=0;i<recipients.length;i++){
            const member = await Member.findOne({ where: { 
                userId: recipients[i],
                chatId
            }});

            if(!member) {
                exists = false;
                break;
            }
        }

        if(exists) return chatId;
    }

    return undefined;
}