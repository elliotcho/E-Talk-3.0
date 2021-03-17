import React from 'react';
import styled from 'styled-components';
import { useNotificationsQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import AuthWrapper from '../containers/shared/AuthWrapper';
import Layout from '../containers/shared/Layout';

const Header = styled.h3`
    margin-top: 50px;
    text-align: center;
    color: white;
`;

const Notifications: React.FC<{}> = () => {
    const { data, loading } = useNotificationsQuery();

    return (
        <AuthWrapper requiresAuth>
            <Layout>
                {loading && (
                    <Header>
                        Loading...
                    </Header>
                )}   

                {!loading && !data?.notifications.length && (
                    <Header>
                        No notifications found
                    </Header>
                )}
            </Layout>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Notifications);