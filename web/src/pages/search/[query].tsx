import React from 'react';
import styled from 'styled-components';
import { useSearchResultsQuery } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';
import Layout from '../../containers/shared/Layout';
import AuthWrapper from '../../containers/shared/AuthWrapper';
import UserCard from '../../containers/shared/UserCard';
import FriendButtonWrapper from '../../containers/shared/FriendButtonWrapper';
import { useRouter } from 'next/router';

const Header = styled.h3`
    margin-top: 50px;
    text-align: center;
    color: white;
`;

const Button = styled.button``;

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

                {!loading && !data?.searchResults.length && (
                    <Header>
                        No users found
                    </Header>
                )}

                {data?.searchResults.map(u => 
                    <UserCard
                        key = {u.id}
                        userId = {u.id}
                        {...u}
                    >
                           {!u.isMe && (
                                <FriendButtonWrapper 
                                    friendStatus={u.friendStatus}
                                    friendId = {u.id}
                                >
                                    <Button>
                                        {u.friendStatus === 0 && 'Add Friend'}
                                        {u.friendStatus === 1 && 'Pending'}
                                        {u.friendStatus === 2 && 'Friends'}
                                    </Button>
                                </FriendButtonWrapper>
                            )}
                    </UserCard>
                )} 
            </Layout>
        </AuthWrapper>
    )   
}

export default withApollo({ ssr: false })(SearchResults);