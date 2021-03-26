import React from 'react';
import { gql } from '@apollo/client';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useUpdateEmailMutation } from '../../generated/graphql';
import FormWrapper from './FormWrapper';
import InputField from '../../components/shared/InputField';
import Button from '../../components/shared/Button';

const Title = styled.h3`
    color: black;
    margin-bottom: 20px;
    text-align: left;
`;

interface ChangeEmailFormProps {
    userId: number;
    email: string;
}

const ChangeEmailForm : React.FC<ChangeEmailFormProps> = ({ userId, email }) => {
    const [changeEmail] = useUpdateEmailMutation();
    
    const toastInfo = {
        position: toast.POSITION.BOTTOM_RIGHT,
        draggable: false
    };

    return (
        <Formik
            enableReinitialize
            initialValues = {{ newEmail: email }}
            onSubmit = {async ({ newEmail }) => {

                if(!newEmail.trim().length) {

                    toast.error('Input cannot be empty', toastInfo);
                    return;
                
                }

                const response = await changeEmail({ 
                    variables: { newEmail },
                    update: (cache) => {
                        const newData = { email: newEmail };

                        cache.writeFragment({
                            id: 'User:' + userId,
                            fragment: gql`
                                fragment _ on User {
                                    email
                                }
                            `,
                            data: newData
                        })
                    }
                });

                if(!response?.data?.updateEmail) {
                    toast.error("Email is taken", toastInfo);
                } else {
                    toast.success("SAVED", toastInfo);
                }

            }}
        >
            {({ values, handleChange, isSubmitting }) => (
                <FormWrapper>
                    <Form>
                        <Title>Change your email</Title>

                        <InputField
                            type = 'email'
                            onChange = {handleChange}
                            value = {values.newEmail}
                            name = 'newEmail'
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

export default ChangeEmailForm;