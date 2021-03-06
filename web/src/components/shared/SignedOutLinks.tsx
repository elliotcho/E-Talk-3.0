import React from 'react';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import NextLink from 'next/link';

const Link = styled.span`
    font-size: 1.3rem;
    margin-right: 15px;
    cursor: pointer;
    color: white;
    &:hover {
        text-decoration: underline;
    }
`;

const SignedOutLinks : React.FC<{}> = () => {
    return (
        <Nav>
            <Nav.Item>
                <NextLink href='/login'>
                    <Link>
                        Login
                    </Link>
                </NextLink>
            </Nav.Item>

            <Nav.Item>
                <NextLink href='/register'>
                    <Link>
                        Register
                    </Link>
                </NextLink>
            </Nav.Item>
        </Nav>
    )
}

export default SignedOutLinks;