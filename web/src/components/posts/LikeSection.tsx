import React, { useState } from 'react';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useLikePostMutation, LikersDocument } from '../../generated/graphql';
import { formatCount } from '../../utils/formatCount';
import LikeModal from './LikeModal';

const Flex = styled.div`
    display: flex;
`;

const BoxStyles = `
    padding: 5px;
    height: 90%;
    margin-left: 10px;
    background: black;
    cursor: pointer;
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
    numLikes: number;
}

const LikeSection : React.FC<LikeSectionProps> = ({ postId, likeStatus, numLikes }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [likePost] = useLikePostMutation({
        refetchQueries: [{ 
            query: LikersDocument, 
            variables: { postId }
        }]
    });

    const handleClick = async () => {
        await likePost({
            variables: { postId },
            update: (cache) => {
                const data = cache.readFragment<{
                    likeStatus: boolean,
                    numLikes: number;
                }>({
                    id: 'Post:' + postId,
                    fragment: gql`
                       fragment _ on Post {
                          likeStatus
                          numLikes
                       }
                    `
                });
               
                 if(data) {
                    const { likeStatus, numLikes } = data;
                    let newData = {};

                    if(likeStatus) {
                       newData = { numLikes: numLikes - 1, likeStatus: false };
                    } else {
                       newData = { numLikes: numLikes + 1, likeStatus: true };
                    }
               
                     cache.writeFragment({
                        id: 'Post:' + postId,
                        fragment: gql`
                          fragment _ on Post {
                             likeStatus
                             numLikes
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
                <WhiteBox onClick={handleClick}>
                     <FontAwesomeIcon icon={faHeart}/>
                </WhiteBox>
            )}

            {likeStatus && (
                <RedBox onClick={handleClick}>
                    <FontAwesomeIcon icon={faHeart}/>
                </RedBox>
            )}

            <Span
                onClick = {() => {
                    if(numLikes >= 1) {
                        setIsOpen(true);
                    }
                }}
            >
                {numLikes !== 0 && (
                    numLikes > 1 ? `${formatCount(numLikes)} likes` :
                                   `${formatCount(numLikes)} like`
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