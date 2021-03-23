import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { toast } from 'react-toastify';
import {
    useNewCommentSubscription,
    useNewFriendSubscription,
    useNewFriendRequestSubscription,
    useNewLikeSubscription
} from '../../generated/graphql';   
import { createToast } from '../../utils/createToast';
import Toast from '../../components/shared/Toast';

const SubscriptionWrapper: React.FC<{}> = ({ children }) => {
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
        if(newLikeData || newCommentData || newFriendData) {
            cache.evict({ fieldName: 'notifications' });
        }

        if(newLikeData) {
            const payload = newLikeData?.newLike;
            const route = '/notifications';
            const type = 'error';
            
            createToast(payload, Toast, route, type);
        }

        if(newCommentData) {
            const payload = newCommentData?.newComment;
            const route = '/notifications';
            const type = 'dark';
      
            createToast(payload, Toast, route, type);
        }

        if(newFriendData) {
            const payload = newFriendData?.newFriend;
            const route = '/notifications';
            const type = 'success';
      
            createToast(payload, Toast, route, type);
        }

        if(newRequestData) {
            cache.evict({ fieldName: 'friendRequests' });

            const text = 'sent you a friend request';

            const payload = { ...newRequestData?.newFriendRequest, text };
            const route = '/mynetwork';
            const type = 'warning';

            createToast(payload, Toast, route, type);
        }

        cache.evict({ fieldName: 'me' });

    }, subscriptionData);

    return (
        <>
            {children}
        </>
    )
}

export default SubscriptionWrapper;