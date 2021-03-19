import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import { useUpdateBioMutation, useUserQuery } from '../../generated/graphql';
import EditModal from '../../components/shared/EditModal';
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
    overflow-wrap: break-word;
    white-space: pre-wrap;
    text-align: left;
`;

interface UserBioProps {
    userId: number;
}

const UserBio : React.FC<UserBioProps> = ({ userId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [updateBio] = useUpdateBioMutation();

    const { data } = useUserQuery({
        variables: { userId }
    });

    const userBio = data?.user?.bio;
    const isMe = data?.user?.isMe;

    return (
        <Container>
            <Header>
                {userBio? userBio: 'No bio available'}
            </Header>

            {isMe && ( 
                <Button 
                    isLoading = {isLoading}
                    onClick={() => setIsOpen(true)}
                    bg = '#0275d8' 
                >
                    Update
                </Button>
            )}

            <EditModal
                open = {isOpen}
                content = {userBio}
                title = 'Edit your bio'
                onClose = {() => setIsOpen(false)}
                onSubmit = {async (newBio) => {
                    setIsLoading(true);

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
                    });

                    setIsLoading(false);
                }}
            />
        </Container>
    )
}

export default UserBio;