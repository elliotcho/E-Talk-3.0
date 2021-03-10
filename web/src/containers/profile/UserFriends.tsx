import React from 'react';
import styled from 'styled-components';
import { useMeQuery, useFriendsQuery } from '../../generated/graphql';
import FriendButtonWrapper from '../shared/FriendButtonWrapper';
import NextLink from 'next/link';

const Header = styled.h3`
    margin-top: 20px;
    text-align: center;
    color: black;
`;

const Card = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid black;
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

const Button = styled.button``;

interface UserFriendsProps {
    userId: number;
}

const UserFriends: React.FC<UserFriendsProps> = ({ userId }) => {
    const myId = useMeQuery()?.data?.me?.id;

    const { data, loading } = useFriendsQuery({
        variables: { userId },
        skip: userId === -1
    });

    return (
        <>
            {loading && (
                <Header>
                    Loading...
                </Header>
            )}

            {data?.friends.map(u => {
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
                
                        {myId && (
                            <Box>
                                <FriendButtonWrapper 
                                    friendStatus={u.friendStatus}
                                    friendId = {u.id}
                                >
                                    <Button>
                                        {u.friendStatus === 0 && 'Add Friend'}
                                        {u.friendStatus === 1 && 'Pending'}
                                        {u.friendStatus === 2 && 'Friends'}
                                    </Button>
                                </FriendButtonWrapper>
                            </Box>
                        )}
                    </Card>
                )
            })}
        </>
    )
}

export default UserFriends;