import React from 'react';
import styled from 'styled-components';
import { useMeQuery, useUpdateProfilePicMutation } from '../../generated/graphql';
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

const Image = styled.img`
    display: block;
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
`

const Profile : React.FC<{}> = () => {
    const { data } = useMeQuery();
    const [upload] = useUpdateProfilePicMutation();

    return (
        <Layout>
            <Container>
                <Box>
                    {data?.me?.firstName} {data?.me?.lastName}

                    {data?.me?.profileURL && (
                        <Image src={data.me.profileURL} alt ='Profile pic'/>
                    )}

                    <input
                        type = 'file'
                        onChange = {async (e) => {
                            const file = e.target.files[0];

                            await upload({ 
                                variables: { file } 
                            });
                        }}
                    />
                </Box>

                <Box />
            </Container>
        </Layout>
    )
}


export default withApollo({ ssr: true })(Profile);