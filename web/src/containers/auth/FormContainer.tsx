import React from 'react';
import styled from 'styled-components';

const Flex = styled.div`
    display: flex;
    align-items: center;
    height: 92vh;
`;

const Container = styled.div`
    margin: auto;
    width: 400px;
    text-align: center;
`;

const FormContainer: React.FC<{}> = ({ children }) => {
    return (
        <Flex>
            <Container>
                {children}
            </Container>
        </Flex>
    )
}

export default FormContainer;