import React from 'react';

interface PostProps {
    postId: number;
    createdAt: string;
    content: string;
    firstName: string;
    lastName: string;
    userId: number;
}

const Post : React.FC<PostProps> = ({ content, firstName, lastName }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h2>
                {content} by {firstName} { lastName}
            </h2>
        </div>
    )
}

export default Post;