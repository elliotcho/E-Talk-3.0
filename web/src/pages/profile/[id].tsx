import React from 'react';
import styled from 'styled-components';
import { useUserPostsQuery } from '../../generated/graphql';
import { mapPostProps } from '../../utils/mapPostProps';
import { withApollo } from '../../utils/withApollo';
import Sidebar from '../../containers/profile/Sidebar.tsx/Sidebar';
import CreatePostForm from '../../components/CreatePostForm';
import Layout from '../../components/shared/Layout';
import Post from '../../components/Post';
import { useRouter } from 'next/router';

const Container = styled.div`
   display: grid;
   grid-template-columns: 300px 1fr;
   grid-gap: 50px;
`;

const Box  = styled.div`
    width: 90%;
    min-height: 460px;
    min-width: 600px;
    background: white;
    overflow: auto;
    color: black;
`;

const Profile : React.FC<{}> = () => {
    const { query: { id } } = useRouter();
    const userId = (typeof id === 'string') ? parseInt(id) : -1;

    const postsResponse = useUserPostsQuery();

    return (
        <Layout>
            <Container>
                <Sidebar userId={userId}/>

                <Box>
                    <CreatePostForm />

                    {postsResponse.data?.userPosts.map(p => 
                        <Post  {...mapPostProps(p)} />  
                    )}
                </Box>
            </Container>
        </Layout>
    )
}


export default withApollo({ ssr: true })(Profile);