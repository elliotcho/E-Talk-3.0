import React from 'react';
import styled from 'styled-components';
import { useNotificationsQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import AuthWrapper from '../containers/shared/AuthWrapper';
import Layout from '../containers/shared/Layout';
import Notification from '../containers/notifications/Notification';
import Button from '../components/shared/Button';
import Icon from '../components/notifications/Icon';
import NextLink from 'next/link';

const Header = styled.h3`
    margin-top: 50px;
    text-align: center;
    color: white;
`;


const ButtonContainer = styled.div`
   max-width: 600px;
   text-align: center;
   margin: 30px auto;
`;

const Notifications: React.FC<{}> = () => {
    const { data, loading, fetchMore, variables } = useNotificationsQuery({
        variables: { cursor: null, limit: 5 }
    });

    return (
        <AuthWrapper requiresAuth>
            <Layout>
                {loading && (
                    <Header>
                        Loading...
                    </Header>
                )}   

                {!loading && !data?.notifications.notifications.length && (
                    <Header>
                        No notifications found
                    </Header>
                )}

                {data?.notifications.notifications.map((n, i) => {
                    let route = `/profile/${n.user.id}`;

                    if(n.postId) {
                        route = `/post/${n.postId}`;
                    }

                    return (
                        <Notification
                            key = {i}
                            route = {route}
                            {...n.user}
                            {...n}
                        />
                    )
                })}

                {data?.notifications?.hasMore && (
                    <ButtonContainer>
                        <Button 
                            bg = 'lightslategray'
                            isLoading={loading}
                            onClick = {async () => {
                                let cursor = data.notifications.notifications[data.notifications.notifications.length - 1]?.createdAt;
                                const limit = variables?.limit;

                                if(!cursor) {
                                    cursor = null;
                                }

                                await fetchMore({
                                    variables: { cursor, limit }
                                });
                            }}
                        >
                            Load More
                        </Button>
                    </ButtonContainer>
                )}
            </Layout>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Notifications);