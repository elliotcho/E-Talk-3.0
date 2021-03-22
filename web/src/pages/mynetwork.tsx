import React, { useEffect} from 'react';
import { ApolloCache } from '@apollo/client';
import styled from 'styled-components';
import { 
    useReadFriendRequestsMutation,
    AcceptFriendRequestMutation as AcceptMutation,
    DeclineFriendRequestMutation as DeclineMutation,
    useAcceptFriendRequestMutation, 
    useDeclineFriendRequestMutation, 
    useFriendRequestsQuery 
} from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import AuthWrapper from '../containers/shared/AuthWrapper';
import Layout from '../containers/shared/Layout';
import UserCard from '../containers/shared/UserCard';

const Header = styled.h3`
    margin-top: 50px;
    text-align: center;
    color: white;
`;

const Button = styled.button`
    margin-right: 15px;
`;

const MyNetwork: React.FC<{}> = () => {
    const { data, loading } = useFriendRequestsQuery();

    const [acceptRequest] = useAcceptFriendRequestMutation();
    const [declineRequest] = useDeclineFriendRequestMutation();
    const [readRequests] = useReadFriendRequestsMutation();

    useEffect(() => {
        const onMount = async () => {
            await readRequests({
                update: (cache) => {
                    cache.evict({ fieldName: 'me' });
                }
            })
        }

        onMount();
    }, [data]);

    const getMutationPayload = (userId: number) => ({
        variables: { senderId: userId },
        update: (
            cache: ApolloCache<AcceptMutation | DeclineMutation>
        ) => {

            cache.evict({ fieldName: 'friendRequests' });
            cache.evict({ fieldName: "notifications" });
            cache.evict({ fieldName: "posts" });
            
        }
    });

    return (
        <AuthWrapper requiresAuth>
            <Layout>
                {loading && (
                    <Header>
                        Loading...
                    </Header>
                )}

                {!loading && !data?.friendRequests.length && (
                    <Header>
                        You have no friend requests
                    </Header>
                )}

                {data?.friendRequests.map(u => 
                    <UserCard
                        key = {u.id}
                        userId = {u.id}
                        {...u}
                    >
                        <Button
                            onClick = {async () => {
                                const userId = u.id;
                                const payload = getMutationPayload(userId);

                                await declineRequest(payload);
                            }}
                        >
                            Decline
                        </Button>

                        <Button
                            onClick = {async () => {
                                const userId = u.id;
                                const payload = getMutationPayload(userId);

                                await acceptRequest(payload);
                            }}
                        >
                            Accept
                        </Button>
                    </UserCard>
                )}
            </Layout>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(MyNetwork);