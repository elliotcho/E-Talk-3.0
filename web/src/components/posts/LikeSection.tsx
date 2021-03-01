import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useLikePostMutation } from '../../generated/graphql';

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

interface LikeSectionProps {
    postId: number;
}

const LikeSection : React.FC<LikeSectionProps> = ({ postId }) => {
    const [likePost] = useLikePostMutation();

    return (
        <Flex>
            <Box
                onClick = {async () => {
                    await likePost({ variables: { postId }});
                }}
            >
                <FontAwesomeIcon icon={faHeart}/>
            </Box>

            <Span>
                1 like
            </Span>
        </Flex>
    )
}

export default LikeSection;