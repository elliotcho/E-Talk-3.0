import React from 'react';
import styled from 'styled-components';
import Icon from '../../components/notifications/Icon';
import NextLink from 'next/link';

const Card = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    max-width: 600px;
    margin: 50px auto;
    background: #313131;
    padding: 15px;
    cursor: pointer;
    color: white;
    &:hover {
        box-shadow: 0 0 5px black;
    }
`;

const Image = styled.img`
    height: 6rem;
    width: 6rem;
`;

const Text = styled.h3`
    margin-left: 20px;
    line-height: 1.2;
    overflow-wrap: break-word;
    white-space: pre-wrap;
`;

interface NotificationProps {
    firstName: string;
    lastName: string;
    profileURL: string;
    route: string;
    text: string;
    type: string;
}

const Notification: React.FC<NotificationProps> = ({ 
    firstName,
    lastName,
    profileURL,
    route,
    text,
    type
}) => {
    return (
        <NextLink href={route}>
            <Card>
                <Image src={profileURL} alt='profile pic'/>

                <Text>
                    {firstName} {lastName} {text}

                    <Icon type={type}/>
                </Text>
            </Card>
        </NextLink>
    )
}

export default Notification;