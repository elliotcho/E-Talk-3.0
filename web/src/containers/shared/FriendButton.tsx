import React from 'react';
import { useSendFriendRequestMutation } from '../../generated/graphql';

const FriendButton: React.FC<{}> = ({ children }) => {
    const [sendFriendRequest] = useSendFriendRequestMutation();

    return (
        <>
            {children}
        </>
    )
}

export default FriendButton;