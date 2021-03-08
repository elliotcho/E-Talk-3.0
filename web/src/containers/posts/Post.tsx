import React from 'react';
import styled from 'styled-components';
import PostHeader from '../../components/posts/PostHeader';
import PostBody from '../../components/posts/PostBody';
import LikeSection from '../../components/posts/LikeSection';
import CommentSection from '../../components/posts/CommentSection';

const Container = styled.div`
    width: 90%;
    max-width: 600px;
    margin: 30px auto;
    border: 1px solid black;
    background: white;
    padding: 15px;
    color: black;
    &:last-child {
        margin-bottom: 70px;
    }
`;

const Flex = styled.div`
    margin-top: 20px;
    display: flex;
`;

interface PostProps {
    postId: number;
    createdAt: string;
    content: string;
    numComments: number;
    likeStatus: boolean;
    numLikes: number;
    seeMore?: boolean;
    profileURL: string;
    firstName: string;
    lastName: string;
    userId: number;
}

const Post : React.FC<PostProps> = (props) => {
    const { postId, numComments } = props;

    return (
        <Container>
            <PostHeader {...props}/>

            <PostBody 
                postId={postId}
                content={props.content} 
                seeMore={props.seeMore}
            />

            <Flex>
                <LikeSection 
                    postId={postId} 
                    likeStatus={props.likeStatus}
                    numLikes={props.numLikes}
                />
                
                <CommentSection 
                    postId={postId} 
                    numComments={numComments} 
                />
            </Flex>
        </Container>
    )
}

export default Post;