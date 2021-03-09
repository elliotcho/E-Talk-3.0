import React from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { FormControl } from 'react-bootstrap';
import { useUserQuery } from '../../generated/graphql';
import { useRouter } from 'next/router';

const Container = styled.div`
    max-width: 400px;
    margin: 20px auto;

    @media screen and (min-width: 768px) {
        width: 110%;
        margin: 0 5px;
    }
`;

const Searchbar : React.FC<{}> = () => {
    const router = useRouter();
    let searchQuery = router.query.query as string;

    if(router.pathname.includes('profile') && router.query.id) {
        let userId = router.query.id as string;

        const { data } = useUserQuery({
            variables: { userId: parseInt(userId) }
        });

        if(data?.user) {
            let firstName = data.user.firstName;
            let lastName = data.user.lastName;

            searchQuery = `${firstName} ${lastName}`;
        }
    }

    return (
        <Container>
            <Formik
                initialValues = {{ query: searchQuery }}
                onSubmit = {async ({ query }) => {
                    if(query.trim().length === 0) {
                        return;
                    }

                    router.push(`/search/${query}`);
                }}
            >
                {({ values, handleChange }) => (
                    <Form>
                         <FormControl
                            type = 'text'
                            placeholder = 'Search'
                            onChange = {handleChange}
                            value = {values.query}
                            name = 'query'
                        />
                    </Form>
                )}
            </Formik>
        </Container>
    )
}

export default Searchbar;