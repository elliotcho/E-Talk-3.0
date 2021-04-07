import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import {
    useNewCommentSubscription,
    useNewFriendSubscription,
    useNewFriendRequestSubscription,
    useNewLikeSubscription,
} from '../../generated/graphql';   
import { createToast } from '../../utils/createToast';
import Toast from '../../components/shared/Toast';

const RegularSubscriptionWrapper: React.FC<{}> = ({ children }) => {
    const { cache } = useApolloClient();

    const { data: newLikeData } = useNewLikeSubscription();
    const { data: newCommentData } = useNewCommentSubscription();
    const { data: newRequestData } = useNewFriendRequestSubscription();
    const { data: newFriendData } = useNewFriendSubscription();

    const subscriptionData = [
        newLikeData, 
        newCommentData, 
        newFriendData, 
        newRequestData
    ];

    useEffect(() => {
        if(newLikeData || newCommentData || newFriendData) cache.evict({ fieldName: 'notifications' });
        if(newRequestData) cache.evict({ fieldName: 'friendRequests' });

        cache.evict({ fieldName: 'me' });

        if(newLikeData) {
            const data = newLikeData?.newLike;
            const route = '/notifications';
            const type = 'error';
            
            createToast(data, Toast, route, type);
        }

        if(newCommentData) {
            const data = newCommentData?.newComment;
            const route = '/notifications';
            const type = 'dark';
      
            createToast(data, Toast, route, type);
        }

        if(newFriendData) {
            const data = newFriendData?.newFriend;
            const route = '/notifications';
            const type = 'success';
      
            createToast(data, Toast, route, type);
        }

        if(newRequestData) {
            const text = 'sent you a friend request';

            const data = { ...newRequestData?.newFriendRequest, text };
            const route = '/mynetwork';
            const type = 'warning';

            createToast(data, Toast, route, type);
        }

    }, subscriptionData);

    return (
        <>
            {children}
        </>
    )
}

export default RegularSubscriptionWrapper;