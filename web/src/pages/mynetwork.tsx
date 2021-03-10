import React from 'react';
import styled from 'styled-components';
import { 
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

    return (
        <AuthWrapper requiresAuth>
            <Layout>
                {loading && (
                    <Header>
                        Loading...
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
                                await declineRequest({
                                    variables: { senderId: u.id },
                                    update: (cache) => {
                                        cache.evict({ id: "User:" + u.id });
                                    }
                                })
                            }}
                        >
                            Decline
                        </Button>

                        <Button
                            onClick = {async () => {
                                await acceptRequest({
                                    variables: { senderId: u.id },
                                    update: (cache) => {
                                        cache.evict({ id: "User:" + u.id })
                                    }
                                })
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