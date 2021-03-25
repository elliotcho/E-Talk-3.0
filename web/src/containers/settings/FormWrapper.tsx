import React from 'react';
import styled  from 'styled-components';

const Flex = styled.div`
    display: flex;
    align-items: center;
    height: auto;
`;

const Container = styled.div`
    margin: 40px auto;
    text-align: center;
    width: 400px;
`;

const FormWrapper: React.FC<{}> = ({ children }) => (
    <Flex>
        <Container>
            {children}
        </Container>
    </Flex>
) 

export default FormWrapper;