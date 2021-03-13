import React from 'react';
import { gql } from '@apollo/client';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import { useUpdateBioMutation, useUserQuery } from '../../generated/graphql';
import Button from '../../components/shared/Button';

const Container = styled.div`
    width: 90%;
    margin: 40px auto;
    text-align: center;
    max-width: 600px;
`;

const Header = styled.h3`
    color: #737373;
    font-family: 'Arial';
    text-align: left;
`;

const FormContainer = styled.div`
    width: 90%;
    max-width: 600px;
    position: absolute;
    bottom: 50px;
`;

const Textarea = styled.textarea`
    width: 100%;
    height: 100px;
    font-size: 1.3rem;
    resize: none;
`;

interface UserBioProps {
    userId: number;
}

const UserBio : React.FC<UserBioProps> = ({ userId }) => {
    const [updateBio] = useUpdateBioMutation();

    const { loading, data } = useUserQuery({
        variables: { userId }
    });
    
    const userBio = data?.user?.bio || '';
    const isMe = data?.user?.isMe;

    return (
        <Container>
            <Header>
                {userBio? userBio: 'No bio available'}
            </Header>

            {isMe && ( 
                <Formik
                    enableReinitialize
                    initialValues = {{ newBio: userBio }}
                    onSubmit = {async ({ newBio }) => {
                        const newData = { bio: newBio };

                        await updateBio({
                            variables: { newBio },
                            update: (cache) => {
                                cache.writeFragment({
                                    id: 'User:' + userId,
                                    fragment: gql`
                                    fragment _ on User {
                                        bio
                                    }
                                    `,
                                    data: newData
                                });
                            }
                        })
                    }}
                >
                    {({ values, handleChange }) => (
                        <FormContainer>
                            <Form>
                                <Header>Update Your Bio</Header>

                                <Textarea
                                    value = {values.newBio}
                                    onChange = {handleChange}
                                    name = 'newBio'
                                />

                                <Button isLoading={loading}>
                                    Save
                                </Button>
                            </Form>
                        </FormContainer>
                    )}
                </Formik>
            )}
        </Container>
    )
}

export default UserBio;