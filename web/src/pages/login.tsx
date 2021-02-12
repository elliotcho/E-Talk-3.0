import React from 'react';
import { Form, Formik } from 'formik';
import { useLoginMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const Login: React.FC<{}> = () => {
    const [login] = useLoginMutation();

    return (
        <Formik
            initialValues = {{ email: '', password: '' }}
            onSubmit = {async (values, { setValues }) => {
                const response = await login({
                    variables: { input: { ...values } }
                });

                console.log(response);

                setValues({ email: '' , password: ''});
            }}
        >
            {({ values, handleChange }) => (
                <Form>
                    <div>
                        <input
                            type = 'text'
                            placeholder = 'Email'
                            onChange = {handleChange}
                            value = {values.email}
                            name = 'email'
                        />
                    </div>

                    <div>
                        <input
                            type = 'password'
                            placeholder = 'Password'
                            onChange = {handleChange}
                            value = {values.password}
                            name = 'password'
                        />
                    </div>

                    <button type='submit'>
                        Login
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default withApollo({ ssr: false })(Login);