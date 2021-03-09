import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import styled from 'styled-components';
import { useMeQuery, useUserPostsQuery } from '../../generated/graphql';
import { mapPostProps } from '../../utils/mapPostProps';
import CreatePostForm from '../posts/CreatePostForm';
import Button from '../../components/shared/Button';
import Post from '../posts/Post';

const Header = styled.h3`
    margin-top: 20px;
    text-align: center;
    color: black;
`;

const Container = styled.div`
   max-width: 600px;
   text-align: center;
   margin: 30px auto;
`;

interface UserPostsProps {
    userId: number;
}

const UserPosts: React.FC<UserPostsProps> = ({ userId }) => {
    const apolloClient = useApolloClient();
    const myId = useMeQuery()?.data?.me?.id;

    const { loading, data, fetchMore, variables } = useUserPostsQuery({
        variables: { userId, limit: 5, cursor: null },
    });

    useEffect(() => {
        const resetData = async () => {
            await apolloClient.resetStore();
        }
        
        resetData();
    }, [userId])

    return (
        <>
            {userId === myId && (
                <CreatePostForm variant='black' />
            )}

            {loading && (
                <Header>
                    Loading...
                </Header>
            )}

            {data?.userPosts?.posts.map(p => 
               <Post {...mapPostProps(p)}/>
            )}

            {data?.userPosts?.hasMore && (
               <Container>
                  <Button 
                     bg = 'lightslategray'
                     isLoading={loading}
                     onClick = {async () => {
                        let cursor = data.userPosts.posts[data.userPosts.posts.length - 1]?.createdAt;
                        const limit = variables?.limit;

                        if(!cursor) {
                            cursor = null;
                        }

                        await fetchMore({
                           variables: { userId, cursor, limit }
                        });
                     }}
                  >
                     Load More
                  </Button>
               </Container>
            )}
        </>
    )
}

export default UserPosts;