import React from 'react';
import { usePostsQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import CreatePostForm from '../components/CreatePostForm';
import AuthWrapper from '../components/AuthWrapper';
import Layout from '../components/Layout';

const Index : React.FC<{}> = () => {
   const { data } = usePostsQuery();

   return (
      <AuthWrapper requiresAuth>
         <Layout>
            <CreatePostForm />

            <div style={{ textAlign: 'center' }}>
               {data?.posts.map(p => 
                  <h2 key={p.id}>
                     {p.content}
                  </h2>
               )}
            </div>
         </Layout>
      </AuthWrapper>
   )
}

export default withApollo({ ssr: false })(Index);