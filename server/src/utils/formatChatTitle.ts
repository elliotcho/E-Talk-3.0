import { User } from '../entities/User';

export const formatChatTitle = (
    uid: number | undefined,
    members: User[],
) => {
    let output = '';
    
    for(let i=0;i<members.length;i++) {
        const member = members[i];

        if(members.length !== 1 && uid === member.id) {
            continue;
        }

        output += member.firstName + ' ';
        output += member.lastName + ', ';
    }

    return output.substring(0, output.length - 2);
}