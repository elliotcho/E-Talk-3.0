import React from 'react';
import { gql } from '@apollo/client';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useUpdateNameMutation } from '../../generated/graphql';
import FormWrapper from './FormWrapper';
import InputField from '../../components/shared/InputField';
import Button from '../../components/shared/Button';

const Title = styled.h3`
    color: black;
    margin-bottom: 20px;
    text-align: left;
`;

interface ChangeNameFormProps {
    userId: number;
    firstName: string;
    lastName: string;
}

const ChangeNameForm : React.FC<ChangeNameFormProps> = ({ userId, firstName, lastName }) => {
    const [changeName] = useUpdateNameMutation();

    const toastInfo = {
        position: toast.POSITION.BOTTOM_RIGHT,
        draggable: false
    };

    return (
        <Formik
            enableReinitialize
            initialValues = {{  firstName, lastName }}
            onSubmit = {async ({ firstName, lastName }) => {

                if(!firstName.trim().length || !lastName.trim().length) {

                    toast.error('Input cannot be empty', toastInfo);
                    return;
                
                }

                await changeName({ 
                    variables: { firstName, lastName },
                    update: (cache) => {
                        const newData = { firstName, lastName };

                        cache.writeFragment({
                            id: 'User:' + userId,
                            fragment: gql`
                                fragment _ on User {
                                    firstName
                                    lastName
                                }
                            `,
                            data: newData
                        });
                    }
                });

                toast.success('SAVED', toastInfo);
            
            }}
        >
            {({ values, handleChange, isSubmitting }) => (
                <FormWrapper>
                    <Form>
                        <Title>Change your name</Title>

                        <InputField
                            type = 'text'
                            onChange = {handleChange}
                            value = {values.firstName}
                            name = 'firstName'
                        />

                        <InputField
                            type = 'text'
                            onChange = {handleChange}
                            value = {values.lastName}
                            name = 'lastName'
                        />

                        <Button isLoading={isSubmitting}>
                            Submit
                        </Button>
                    </Form>
                </FormWrapper>
            )}
        </Formik>
    )
}

export default ChangeNameForm;