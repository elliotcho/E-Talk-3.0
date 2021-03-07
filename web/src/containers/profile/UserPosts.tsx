import React from 'react';
import styled from 'styled-components';
import { useMeQuery, useUserPostsQuery } from '../../generated/graphql';
import { mapPostProps } from '../../utils/mapPostProps';
import CreatePostForm from '../posts/CreatePostForm';
import Post from '../posts/Post';

const Header = styled.h3`
    margin-top: 20px;
    text-align: center;
    color: black;
`;

interface UserPostsProps {
    userId: number;
}

const UserPosts: React.FC<UserPostsProps> = ({ userId }) => {
    const myId = useMeQuery()?.data?.me?.id;

    const postsResponse = useUserPostsQuery({
        variables: { userId }
    });

    return (
        <>
            {userId === myId && (
                <CreatePostForm variant='black' />
            )}

            {postsResponse.loading && (
                <Header>
                    Loading...
                </Header>
            )}

            {postsResponse.data?.userPosts.map(p => 
                <Post {...mapPostProps(p)} />
            )}
        </>
    )
}

export default UserPosts;