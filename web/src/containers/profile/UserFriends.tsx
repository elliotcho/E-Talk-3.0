import React from 'react';
import styled from 'styled-components';
import { useMeQuery, useFriendsQuery } from '../../generated/graphql';
import UserCard from '../shared/UserCard';
import FriendButtonWrapper from '../shared/FriendButtonWrapper';

const Header = styled.h3`
    margin-top: 50px;
    text-align: center;
    color: black;
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

            {!loading && !data?.friends.length && (
                <Header>
                    No friends available :(
                </Header>
            )}

            {data?.friends.map(u => 
                <UserCard
                    key = {u.id}
                    userId = {u.id}
                    {...u}
                >
                    {myId && (
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
                    )}
                </UserCard>
            )}
        </>
    )
}

export default UserFriends;