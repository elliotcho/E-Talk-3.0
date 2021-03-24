import React from 'react';
import { gql } from '@apollo/client';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { useUpdateEmailMutation } from '../../generated/graphql';
import InputField from '../../components/auth/InputField';
import Button from '../../components/shared/Button';

interface ChangeEmailFormProps {
    userId: number;
    email: string;
}

const ChangeEmailForm : React.FC<ChangeEmailFormProps> = ({ userId, email }) => {
    const [changeEmail] = useUpdateEmailMutation();

    return (
        <Formik
            enableReinitialize
            initialValues = {{ newEmail: email }}
            onSubmit = {async ({ newEmail }) => {
                if(!newEmail.trim().length) {
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
                    alert("Email is taken");
                } else {
                    alert("SAVED")
                }
            }}
        >
            {({ values, handleChange, isSubmitting }) => (
                <Form>
                    <h1>Change your email</h1>

                    <InputField
                        type = 'text'
                        onChange = {handleChange}
                        value = {values.newEmail}
                        name = 'newEmail'
                    />

                    <Button isLoading={isSubmitting}>
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default ChangeEmailForm;