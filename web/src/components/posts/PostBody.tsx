import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    overflow-wrap: break-word;
    white-space: pre-wrap;
    font-size: 1.6rem;
    padding: 20px 10px;
    margin-top: 30px;
`;

interface PostBodyProps {
    content: string;
}

const PostBody: React.FC<PostBodyProps> = ({ content }) => {
    return (
        <Container>
            {content}
        </Container>
    )
}

export default PostBody;