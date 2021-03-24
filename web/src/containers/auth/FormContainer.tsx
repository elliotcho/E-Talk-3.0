import React from 'react';
import styled from 'styled-components';

const Flex = styled.div`
    display: flex;
    align-items: center;
    height: 92vh;
`;

const Container = styled.div`
    margin: auto;
    text-align: center;
    width: 400px;
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