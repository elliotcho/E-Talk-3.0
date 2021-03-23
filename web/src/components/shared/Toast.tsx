import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const Image = styled.img`
    height: 4rem;
    width: 4rem;
`;

const Body = styled.div`
    overflow-wrap: break-word;
    white-space: pre-wrap;
    margin-left: 15px;
`;

const Header = styled.span`
    margin-right: 5px;
    font-weight: bold;
`;

interface ToastProps {
    route: string;
    profileURL: string;
    firstName: string;
    lastName: string;
    text: string;
}

const Toast  :React.FC<ToastProps> = ({
    route, 
    profileURL,
    firstName,
    lastName,
    text
}) => {
    return (
        <NextLink href={route}>
            <Container>
                <Image src={profileURL} alt='Profile pic' />

                <Body>
                    <Header>
                        {firstName} {lastName}
                    </Header>

                    {text}
                </Body>
            </Container>
        </NextLink>
    )
}

export default Toast;