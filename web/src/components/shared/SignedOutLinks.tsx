import React from 'react';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import NextLink from 'next/link';

const Item = styled.div`
    @media screen and (max-width: 768px) {
        cursor: pointer;
        margin-top: 20px;
        padding: 12px;
        &:hover {
            background: azure;
        }
    }
`;

const Link = styled.span`
    font-size: 1.1rem;
    margin-right: 15px;
    cursor: pointer;
    color: white;
    &:hover {
        text-decoration: underline;
    }

    @media screen and (max-width: 768px) {
        ${Item}:hover & {
            text-decoration: underline;
            color: black;
        }
    }
`;

const SignedOutLinks : React.FC<{}> = () => {
    return (
        <Nav>
            <NextLink href='/login'>
                <Item>
                    <Link>
                        Login
                    </Link>
                </Item>
            </NextLink>

            <NextLink href='/register'>
                <Item>
                    <Link>
                        Register
                    </Link>
                </Item>
            </NextLink>
        </Nav>
    )
}

export default SignedOutLinks;