import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 400px;
    text-align: center;
    margin: 50px auto;
`;

const FormContainer: React.FC<{}> = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default FormContainer;