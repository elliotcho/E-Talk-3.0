import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import {
    useNewLikeSubscription
} from '../../generated/graphql';   

const SubscriptionWrapper: React.FC<{}> = ({ children }) => {
    const apolloClient = useApolloClient();
    const { data } = useNewLikeSubscription();

    useEffect(() => {
        
        apolloClient.cache.evict({
            fieldName: 'me'
        });

    }, [data]);

    return (
        <>
            {children}
        </>
    )
}

export default SubscriptionWrapper;