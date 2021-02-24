import React from 'react';
import styled from 'styled-components';
import PostHeader from '../../components/posts/PostHeader';

const Container = styled.div`
    width: 90%;
    max-width: 600px;
    margin: 30px auto;
    background: white;
    border: 1px solid black;
    padding: 15px;
    color: black;
`;

interface PostProps {
    postId: number;
    createdAt: string;
    content: string;
    profileURL: string;
    firstName: string;
    lastName: string;
    userId: number;
}

const Post : React.FC<PostProps> = (props) => {
    return (
        <Container>
            <PostHeader {...props}/>
        </Container>
    )
}

export default Post;