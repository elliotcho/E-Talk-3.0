import React from 'react';
import styled from 'styled-components';
import { FormControl } from 'react-bootstrap';

const Container = styled.div`
    max-width: 400px;
    margin: 20px auto;

    @media screen and (min-width: 768px) {
        width: 110%;
        margin: 0 5px;
    }
`;

const Searchbar : React.FC<{}> = () => {
    return (
        <Container>
            <FormControl
                placeholder = 'search'
                type = 'text'
            />
        </Container>
    )
}

export default Searchbar;