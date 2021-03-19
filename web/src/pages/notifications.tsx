import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNotificationsQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import AuthWrapper from '../containers/shared/AuthWrapper';
import Layout from '../containers/shared/Layout';
import NextLink from 'next/link';

const Header = styled.h3`
    margin-top: 50px;
    text-align: center;
    color: white;
`;

const Card = styled.div`
    display: flex;
    align-items: center;
    max-width: 600px;
    margin: 50px auto;
    background: #313131;
    padding: 15px;
    cursor: pointer;
    color: white;
    &:hover {
        box-shadow: 0 0 5px black;
    }
`;

const Image = styled.img`
    height: 6rem;
    width: 6rem;
`;

const Text = styled.h3`
    margin-left: 20px;
    overflow-wrap: break-word;
    white-space: pre-wrap;
`;

const Icon = styled.div`
    margin-top: 10px;
    color: red;
`;

const Notifications: React.FC<{}> = () => {
    const { data, loading } = useNotificationsQuery({
        fetchPolicy: 'network-only'
    });

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

                {data?.notifications.map(n => {
                    const { id: userId, firstName, lastName, profileURL } = n.user;

                    let route = `/profile/${userId}`;

                    if(n.postId) {
                        route = `/post/${n.postId}`;
                    }

                    return (
                        <NextLink href={route}>
                            <Card>
                                <Image src={profileURL} alt='profile pic'/>

                                <Text>
                                    {firstName} {lastName} {n.text}

                                    <Icon>
                                        {n.type === 'like' && <FontAwesomeIcon icon={faHeart} />}
                                    </Icon>
                                </Text>
                            </Card>
                        </NextLink>
                    )
                })}
            </Layout>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Notifications);