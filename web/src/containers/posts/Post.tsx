import React from 'react';
import styled from 'styled-components';
import PostHeader from '../../components/posts/PostHeader';
import PostBody from '../../components/posts/PostBody';

const Container = styled.div`
    width: 90%;
    max-width: 600px;
    margin: 30px auto;
    background: white;
    padding: 15px;
    color: black;
    &:last-child {
        margin-bottom: 70px;
    }
`;

interface PostProps {
    postId: number;
    createdAt: string;
    content: string;
    seeMore: boolean;
    profileURL: string;
    firstName: string;
    lastName: string;
    userId: number;
}

const Post : React.FC<PostProps> = (props) => {
    const { postId, content, seeMore } = props;

    return (
        <Container>
            <PostHeader {...props}/>

            <PostBody 
                postId={postId}
                content={content} 
                seeMore={seeMore}
            />
        </Container>
    )
}

export default Post;