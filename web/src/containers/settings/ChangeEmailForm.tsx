import React from 'react';
import { gql } from '@apollo/client';
import { Formik, Form } from 'formik';
import { useUpdateEmailMutation } from '../../generated/graphql';
import FormWrapper from './FormWrapper';
import Title from '../../components/shared/Title';
import InputField from '../../components/shared/InputField';
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
                <FormWrapper>
                    <Form>
                        <Title color='black'>
                            Change your email
                        </Title>

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
                </FormWrapper>
            )}
        </Formik>
    )
}

export default ChangeEmailForm;