import React, { useState } from 'react';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useLikePostMutation } from '../../generated/graphql';
import { formatCount } from '../../utils/formatCount';
import LikeModal from './LikeModal';

const Flex = styled.div`
    display: flex;
`;

const BoxStyles = `
    padding: 5px;
    margin-left: 10px;
    cursor: pointer;
    background: black;
`;

const WhiteBox = styled.div`
    ${BoxStyles}
    color: white;
    &:hover {
        color: red;
    }
`;

const RedBox = styled.div`
    ${BoxStyles}
    color: red;
    &:hover {
        color: white;
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
    likeStatus: boolean;
    likes: number;
}

const LikeSection : React.FC<LikeSectionProps> = ({ postId, likeStatus, likes }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [likePost] = useLikePostMutation();

    let numLikes = formatCount(likes);

    const onClick = async () => {
        await likePost({
            variables: { postId },
            update: (cache) => {
                const data = cache.readFragment<{
                    likeStatus: boolean,
                    likes: number;
                }>({
                    id: 'Post:' + postId,
                    fragment: gql`
                       fragment _ on Post {
                          likeStatus
                          likes
                       }
                    `
                });
               
                 if(data) {
                    const { likeStatus, likes } = data;
                    let newData = {};

                    if(likeStatus) {
                       newData = { likes: likes - 1, likeStatus: false };
                    } else {
                       newData = { likes: likes + 1, likeStatus: true };
                    }
               
                     cache.writeFragment({
                        id: 'Post:' + postId,
                        fragment: gql`
                          fragment _ on Post {
                             likeStatus
                             likes
                          }
                        `,
                        data: newData
                    });
                }
            }
        });
    }

    return (
        <Flex>
            {!likeStatus && (
                <WhiteBox onClick={onClick}>
                     <FontAwesomeIcon icon={faHeart}/>
                </WhiteBox>
            )}

            {likeStatus && (
                <RedBox onClick={onClick}>
                    <FontAwesomeIcon icon={faHeart}/>
                </RedBox>
            )}

            <Span
                onClick = {() => {
                    if(likes >= 1) {
                        setIsOpen(true);
                    }
                }}
            >
                {likes !== 0 && (
                    likes > 1 ? `${numLikes} likes` :
                                `${numLikes} like`
                )}
            </Span>

            <LikeModal
                open = {isOpen}
                onClose = {() => setIsOpen(false)}
                postId = {postId}
            />
        </Flex>
    )
}

export default LikeSection;