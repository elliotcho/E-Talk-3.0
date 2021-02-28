import React from 'react';
import styled from 'styled-components';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Flex = styled.div`
    display: flex;
`;

const Box = styled.div`
    padding: 5px;
    margin-left: 10px;
    cursor: pointer;
    background: black;
    color: white;
    &:hover {
        color: red;
    }
`;

const Span = styled.span`
    margin: 5px 10px;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const LikeSection : React.FC<{}> = () => {
    return (
        <Flex>
            <Box>
                <FontAwesomeIcon icon={faHeart}/>
            </Box>

            <Span>
                1 like
            </Span>
        </Flex>
    )
}

export default LikeSection;