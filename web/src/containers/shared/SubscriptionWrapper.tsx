import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { toast } from 'react-toastify';
import {
    useNewLikeSubscription
} from '../../generated/graphql';   
import Toast from '../../components/shared/Toast';

const SubscriptionWrapper: React.FC<{}> = ({ children }) => {
    const { cache } = useApolloClient();
    const { data: newLikeData } = useNewLikeSubscription();

    useEffect(() => {

        if(newLikeData) {
            cache.evict({ fieldName: 'notifications' });

            const notification = newLikeData?.newLike;
            const route = `/notifications`;
            
            toast.error(<Toast 
                route = {route}
                {...notification.user}
                {...notification}
            />, {
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: false
            });
        }

        cache.evict({ fieldName: 'me' });

    }, [newLikeData]);

    return (
        <>
            {children}
        </>
    )
}

export default SubscriptionWrapper;