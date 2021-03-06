import React from 'react';
import styled from 'styled-components';
import { useUserPostsQuery } from '../../generated/graphql';
import { mapPostProps } from '../../utils/mapPostProps';
import { withApollo } from '../../utils/withApollo';
import Layout from '../../containers/shared/Layout';
import Sidebar from '../../containers/profile/Sidebar';
import CreatePostForm from '../../containers/posts/CreatePostForm';
import Post from '../../containers/posts/Post';
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

const Header = styled.h3`
   text-align: center;
   color: white;
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
                    <CreatePostForm variant='black'/>

                    {postsResponse.loading && (
                        <Header>
                            Loading...
                        </Header>
                    )}

                    {postsResponse.data?.userPosts.map(p => 
                        <Post  {...mapPostProps(p)} />  
                    )}
                </Box>
            </Container>
        </Layout>
    )
}


export default withApollo({ ssr: true })(Profile);