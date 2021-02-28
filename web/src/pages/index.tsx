import React from 'react';
import styled from 'styled-components';
import { usePostsQuery } from '../generated/graphql';
import { mapPostProps } from '../utils/mapPostProps';
import { withApollo } from '../utils/withApollo';
import CreatePostForm from '../containers/posts/CreatePostForm';
import Post from '../containers/posts/Post';
import AuthWrapper from '../components/shared/AuthWrapper';
import Layout from '../components/shared/Layout';

const Header = styled.h2`
   text-align: center;
   color: white;
`;

const Index : React.FC<{}> = () => {
   const { data, loading } = usePostsQuery();

   return (
      <AuthWrapper requiresAuth>
         <Layout>
            <CreatePostForm />

            {loading && (
               <Header>
                  Loading...
               </Header>
            )}

            {data?.posts.map(p => 
               <Post {...mapPostProps(p)}/>
            )}
         </Layout>
      </AuthWrapper>
   )
}

export default withApollo({ ssr: false })(Index);