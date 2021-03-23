import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { toast } from 'react-toastify';
import {
    useNewCommentSubscription,
    useNewLikeSubscription
} from '../../generated/graphql';   
import Toast from '../../components/shared/Toast';

const SubscriptionWrapper: React.FC<{}> = ({ children }) => {
    const { cache } = useApolloClient();

    const { data: newLikeData } = useNewLikeSubscription();
    const { data: newCommentData } = useNewCommentSubscription();

    useEffect(() => {

        if(newLikeData) {
            cache.evict({ fieldName: 'notifications' });

            const notification = newLikeData?.newLike;
      
            const props = {
                route: '/notifications',
                ...notification.user,
                ...notification
            }
            
            toast.error(<Toast {...props}/>, {
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: false
            });
        }

        if(newCommentData) {
            cache.evict({ fieldName: 'notifications' });

            const notification = newCommentData?.newComment;
      
            const props = {
                route: '/notifications',
                ...notification.user,
                ...notification
            }
            
            toast.dark(<Toast {...props}/>, {
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: false
            });
        }

        cache.evict({ fieldName: 'me' });

    }, [newLikeData, newCommentData]);

    return (
        <>
            {children}
        </>
    )
}

export default SubscriptionWrapper;