import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import {
    useNewMessageSubscription,
    useNewReadReceiptSubscription
} from '../../generated/graphql';   

const MessageSubscriptionWrapper: React.FC<{}> = ({ children }) => {
    const { cache } = useApolloClient();

    const { data: newMessageData } = useNewMessageSubscription();
    const { data: newReadReceiptData } = useNewReadReceiptSubscription();

    const subscriptionData = [
        newMessageData,
        newReadReceiptData
    ];

    useEffect(() => {

        if(newMessageData) {
            cache.evict({ fieldName: 'messages' });
            cache.evict({ fieldName: 'me' });
        }

        if(newReadReceiptData) {
            cache.evict({ fieldName: 'readReceipts' });
        }

    }, subscriptionData);

    return (
        <>
            {children}
        </>
    )
}

export default MessageSubscriptionWrapper;