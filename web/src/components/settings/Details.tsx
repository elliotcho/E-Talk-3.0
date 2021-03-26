import React from 'react';
import styled from 'styled-components';

const Details = styled.details`
    border: solid black 1px;
    padding: 30px;
`;

const Summary = styled.summary`
    cursor: pointer;
    &:focus {
        outline: none;
    }
`;

interface DetailsProps {
    summary: string;
}

const Index: React.FC<DetailsProps> = ({ children, summary }) => {
    return (
        <Details>
            <Summary>
                {summary}
            </Summary>
        
            {children}
        </Details>
    )
}

export default Index;