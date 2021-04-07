import { Member } from '../entities/Member';

export const filterSubscription = async ({ context, payload } : any) => {
    const { req } = context.connection.context;
    const { uid } = req.session;

    context.req = req;

    if(payload.isChat) {
        let filter = false;

        const members = await Member.find({ where: { 
            chatId: payload.receiverId
        }});

        for(let i=0;i<members.length;i++) {
            if(members[i].userId === uid) {
                filter = payload.senderId !== uid;
                break;
            }
        }

        return filter;
    }

    return uid === payload.receiverId;
}