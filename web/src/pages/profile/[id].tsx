import React from 'react';
import styled from 'styled-components';
import { withApollo } from '../../utils/withApollo';
import Layout from '../../containers/shared/Layout';
import Sidebar from '../../containers/profile/Sidebar';
import ProfileContent from '../../containers/profile/ProfileContent';
import { useRouter } from 'next/router';

const Container = styled.div`
   display: grid;
   grid-template-columns: 300px 1fr;
   grid-gap: 50px;
`;

const Profile : React.FC<{}> = () => {
    const { query: { id, type } } = useRouter();
    
    let userId = -1;
    let contentType = type;

    if(typeof id === 'string') {
        userId = parseInt(id);
    }

    if(type !== 'posts' && type !== 'friends' && type !== 'bio') {
        contentType = 'posts';
    }

    return (
        <Layout>
            <Container>
                <Sidebar 
                    userId={userId} 
                    type={contentType}
                />
                
                <ProfileContent type={contentType}/>
            </Container>
        </Layout>
    )
}


export default withApollo({ ssr: false })(Profile);