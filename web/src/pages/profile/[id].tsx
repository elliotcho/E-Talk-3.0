import React from 'react';
import styled from 'styled-components';
import { useMeQuery } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';
import Layout from '../../components/Layout';

const Container = styled.div`
   display: grid;
   grid-template-columns: 300px 1fr;
   grid-gap: 50px;
`;

const Box  = styled.div`
    min-height: 460px;
    background: white;
    color: black;
`;

const Profile : React.FC<{}> = () => {
    const { data } = useMeQuery();

    return (
        <Layout>
            <Container>
                <Box>
                    {data?.me?.firstName} {data?.me?.lastName}

                    <input 
                        type = 'file'
                        onChange = {(e) => {

                        }}
                    />
                </Box>

                <Box />
            </Container>
        </Layout>
    )
}


export default withApollo({ ssr: true })(Profile);