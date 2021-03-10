import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';

const Card = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid black;
    margin: 50px auto;
    background: white;
    max-width: 600px;
    padding: 15px;
`;

const Image = styled.img`
    cursor: pointer;
    width: 6rem;
    height: 6rem;
`;

const Primary = styled.h3`
    color: #0275d8;
    cursor: pointer;
    margin-left: 20px;
    &:hover {
        text-decoration: underline;
    }
`;

const Box = styled.div`
    margin-left: auto;
`;

interface UserCardProps {
    userId: number;
    profileURL: string;
    firstName: string;
    lastName: string;
}

const UserCard: React.FC<UserCardProps> = ({ 
    children, 
    userId, 
    profileURL, 
    firstName, 
    lastName 
}) => {
    const route = `/profile/${userId}`;

    return (
        <Card>
            <NextLink href={route}>
                <Image 
                    src={profileURL} 
                    alt='profile pic'
                />
            </NextLink>

            <NextLink href={route}>
                <Primary>
                    {firstName} {lastName}
                </Primary>
            </NextLink>

            <Box>
                {children}
            </Box>
        </Card>
    )
}

export default UserCard;