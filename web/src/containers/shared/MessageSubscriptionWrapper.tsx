import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import {
    useNewMessageSubscription,
    useNewReadReceiptSubscription,
    useNewTypingSubscription
} from '../../generated/graphql';   

const MessageSubscriptionWrapper: React.FC<{}> = ({ children }) => {
    const { cache } = useApolloClient();

    const { data: newMessageData } = useNewMessageSubscription();
    const { data: newReadReceiptData } = useNewReadReceiptSubscription();
    const { data: newTypingData } = useNewTypingSubscription();

    const subscriptionData = [
        newMessageData,
        newReadReceiptData,
        newTypingData
    ];

    useEffect(() => {

        if(newMessageData) {
            cache.evict({ fieldName: 'chats' });
            cache.evict({ fieldName: 'messages' });
            cache.evict({ fieldName: 'me' });
        }

        if(newReadReceiptData) {
            cache.evict({ fieldName: 'readReceipts' });
        }

        if(newTypingData) {
            cache.evict({ fieldName: 'usersTyping' });
        }

    }, subscriptionData);

    return (
        <>
            {children}
        </>
    )
}

export default MessageSubscriptionWrapper;