import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink }from 'apollo-upload-client';
import {
    getPaginatedPostsPolicy
} from './getPaginationPolicies';
import { createWithApollo } from './createWithApollo';
import { isServer } from './isServer';
import { NextPageContext } from 'next';

const postsPolicy = getPaginatedPostsPolicy();
const userPostsPolicy = getPaginatedPostsPolicy()

const client = (ctx: NextPageContext) => (
    new ApolloClient({
        link: createUploadLink({
            uri: 'http://localhost:4000/graphql',
            credentials: 'include',
            headers: {
                cookie: 
                    (isServer() ?
                        ctx?.req?.headers?.cookie :
                        undefined
                    )
            }
        }) as any,
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        userPosts: postsPolicy,
                        posts: postsPolicy
                    }
                }
            }
        })
    })
);

export const withApollo = createWithApollo(client);