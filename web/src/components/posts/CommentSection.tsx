import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const Flex = styled.div`
    display: flex;
`;

const Box = styled.div`
    color: gray;
    font-size: 1.5rem;
    margin-left: 10px;
    cursor: pointer;
    &:hover {
        color: brown;
    }
`;

const Span = styled.span`
    margin: 5px 10px;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const CommentSection: React.FC<{}> = () => {
    return (
        <Flex>
            <Box>
                <FontAwesomeIcon icon={faComment}/>
            </Box>

            <Span>
                1 Comment
            </Span>
        </Flex>
    )
}

export default CommentSection;