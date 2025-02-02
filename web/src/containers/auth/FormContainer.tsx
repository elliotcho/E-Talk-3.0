import React from 'react';
import styled from 'styled-components';

const Flex = styled.div`
    height: 92vh;
    align-items: center;
    display: flex;
`;

const Container = styled.div`
    width: 400px;
    text-align: center;
    margin: auto;
`;

const FormContainer: React.FC<{}> = ({ children }) =>(
    <Flex>
        <Container>
            {children}
        </Container>
    </Flex>
)

export default FormContainer;