import React from 'react';
import styled from 'styled-components';
import { usePostsQuery } from '../generated/graphql';
import { mapPostProps } from '../utils/mapPostProps';
import { withApollo } from '../utils/withApollo';
import AuthWrapper from '../containers/shared/AuthWrapper';
import Layout from '../containers/shared/Layout';
import CreatePostForm from '../containers/posts/CreatePostForm';
import Post from '../containers/posts/Post';
import Button from '../components/shared/Button';

const Header = styled.h3`
   margin-top: 20px;
   text-align: center;
   color: white;
`;

const Container = styled.div`
   max-width: 600px;
   text-align: center;
   margin: 30px auto;
`;

const Index : React.FC<{}> = () => {
   const { loading, data, fetchMore, variables } = usePostsQuery({
      variables: { limit: 5, cursor: null }
   });

   return (
      <AuthWrapper requiresAuth>
         <Layout>
            <CreatePostForm />

            {loading && (
               <Header>
                  Loading...
               </Header>
            )}

            {data?.posts?.posts?.map(p => 
               <Post {...mapPostProps(p)}/>
            )}

            {data?.posts?.hasMore && (
               <Container>
                  <Button 
                     bg = 'lightslategray'
                     isLoading={loading}
                     onClick = {async () => {
                        const cursor = data.posts.posts[data.posts.posts.length - 1].createdAt;
                        const limit = variables?.limit;

                        await fetchMore({
                           variables: { cursor, limit }
                        });
                     }}
                  >
                     Load More
                  </Button>
               </Container>
            )}
         </Layout>
      </AuthWrapper>
   )
}

export default withApollo({ ssr: false })(Index);