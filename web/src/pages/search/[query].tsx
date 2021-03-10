import React from 'react';
import styled from 'styled-components';
import { useSearchResultsQuery } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';
import Layout from '../../containers/shared/Layout';
import AuthWrapper from '../../containers/shared/AuthWrapper';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

const Card = styled.div`
    display: flex;
    align-items: center;
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

const Button = styled.button``;

const Header = styled.h3`
    margin-top: 50px;
    text-align: center;
    color: white;
`;

const SearchResults : React.FC<{}> = () => {
    const searchQuery = useRouter().query.query as string;

    const { loading, data } = useSearchResultsQuery({ 
        variables: { query: searchQuery }
    });

    return (
        <AuthWrapper requiresAuth>
            <Layout>
                {loading && (
                    <Header>
                        Loading...
                    </Header>
                )}   

                {data?.searchResults.map(u => {
                    let route = `/profile/${u.id}`;

                    return (
                        <Card key={u.id}>
                            <NextLink href={route}>
                                <Image 
                                    src={u.profileURL} 
                                    alt='profile pic'
                                />
                            </NextLink>

                            <NextLink href={route}>
                                <Primary>
                                    {u.firstName} {u.lastName}
                                </Primary>
                            </NextLink>

                            {!u.isMe && (
                                 <Box>
                                    <Button>
                                        {u.friendStatus === 0 && 'Add Friend'}
                                        {u.friendStatus === 1 && 'Pending'}
                                        {u.friendStatus === 2 && 'Friends'}
                                    </Button>
                                </Box>
                            )}
                        </Card>
                    )
                })} 
            </Layout>
        </AuthWrapper>
    )   
}

export default withApollo({ ssr: false })(SearchResults);