import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { formatCount } from '../../utils/formatCount';
import CommentModal from './CommentModal';

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

interface CommentSectionProps {
    postId: number;
    numComments: number;
    postOwner: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, numComments, postOwner }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Flex>
            <Box onClick = {() => setIsOpen(true)}>
                <FontAwesomeIcon icon={faComment}/>
            </Box>

            <Span onClick = {() => setIsOpen(true)}>
                {numComments !== 0 && (
                    numComments > 1 ? `${formatCount(numComments)} comments` :
                                      `${formatCount(numComments)} comment`
                )}
            </Span>

            <CommentModal
                open = {isOpen}
                onClose = {() => setIsOpen(false)}
                postOwner = {postOwner}
                postId = {postId}
            />
        </Flex>
    )
}

export default CommentSection;