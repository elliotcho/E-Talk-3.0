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
import NextLink from 'next/link';

const Header = styled.h3`
    margin-top: 50px;
    text-align: center;
    color: white;
`;

const Card = styled.div`
    display: flex;
    align-items: center;
    margin: 50px auto;
    background: white;
    max-width: 600px;
    padding: 15px;
`;

const Image = styled.img`
    cursor: pointer;
    width: 6rem;
    height: 6rem;
`;

const Primary = styled.h3`
    color: #0275d8;
    cursor: pointer;
    margin-left: 20px;
    &:hover {
        text-decoration: underline;
    }
`;

const Box = styled.div`
    margin-left: auto;
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

                {data?.friendRequests.map(u => {
                    const route = `/profile/${u.id}`;

                    return (
                        <Card>
                            <NextLink href={route}>
                                <Image 
                                    src={u.profileURL} 
                                    alt='profile pic'
                                />
                            </NextLink>

                            <NextLink href={route}>
                                <Primary>
                                    {u.firstName} {u.lastName}
                                </Primary>
                            </NextLink>

                            <Box>
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
                                                cache.evict({ id: "User" + u.id })
                                            }
                                        })
                                    }}
                                >
                                    Accept
                                </Button>
                            </Box>
                        </Card>
                    )
                })}
            </Layout>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(MyNetwork);