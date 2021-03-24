import React from 'react';
import { gql } from '@apollo/client';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { useUpdateNameMutation } from '../../generated/graphql';
import InputField from '../../components/auth/InputField';
import Button from '../../components/shared/Button';

interface ChangeNameFormProps {
    userId: number;
    firstName: string;
    lastName: string;
}

const ChangeNameForm : React.FC<ChangeNameFormProps> = ({ userId, firstName, lastName }) => {
    const [changeName] = useUpdateNameMutation();

    return (
        <Formik
            enableReinitialize
            initialValues = {{  firstName, lastName }}
            onSubmit = {async ({ firstName, lastName }) => {
                if(!firstName.trim().length || !lastName.trim().length) {
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
                        })
                    }
                });

                alert("SAVED");
            }}
        >
            {({ values, handleChange, isSubmitting }) => (
                <Form>
                    <h1>Change your name</h1>

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
            )}
        </Formik>
    )
}

export default ChangeNameForm;