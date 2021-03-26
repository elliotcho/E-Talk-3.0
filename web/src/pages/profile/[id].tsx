import React from 'react';
import styled from 'styled-components';
import { withApollo } from '../../utils/withApollo';
import Layout from '../../containers/shared/Layout';
import ProfileSidebar from '../../containers/profile/ProfileSidebar';
import ProfileContent from '../../containers/profile/ProfileContent';
import { useRouter } from 'next/router';

const Container = styled.div`
   display: grid;
   grid-template-columns: 300px 1fr;
   grid-gap: 50px;
`;

const types = [
    'posts', 
    'friends', 
    'bio'
];

const Profile : React.FC<{}> = () => {
    const { query: { id, type } } = useRouter();
    let contentType = 'posts';
    let userId = -1;
    
    if(typeof type === 'string' && types.includes(type)) {
        contentType = type;
    }

    if(typeof id === 'string') {
        userId = parseInt(id);
    } 

    return (
        <Layout>
            <Container>
                <ProfileSidebar 
                    userId={userId} 
                    type={contentType}
                />
                
                <ProfileContent 
                    userId = {userId}
                    type={contentType}
                />
            </Container>
        </Layout>
    )
}

export default withApollo({ ssr: false })(Profile);