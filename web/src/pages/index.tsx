import React from 'react';
import { usePostsQuery } from '../generated/graphql';
import { mapPostProps } from '../utils/mapPostProps';
import { withApollo } from '../utils/withApollo';
import CreatePostForm from '../components/CreatePostForm';
import AuthWrapper from '../components/AuthWrapper';
import Layout from '../components/Layout';
import Post from '../components/Post';

const Index : React.FC<{}> = () => {
   const { data } = usePostsQuery();

   return (
      <AuthWrapper requiresAuth>
         <Layout>
            <CreatePostForm />

               {data?.posts.map(p => 
                  <Post {...mapPostProps(p)}/>
               )}
         </Layout>
      </AuthWrapper>
   )
}

export default withApollo({ ssr: false })(Index);