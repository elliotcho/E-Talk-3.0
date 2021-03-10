import { 
    PaginatedPosts
} from '../generated/graphql';

export const getPaginatedPostsPolicy = (reset = false) => (
    {
        keyArgs: ['PaginatedPosts'],
        merge(
            existing: PaginatedPosts | undefined,
            incoming: PaginatedPosts
        ) : PaginatedPosts {
            return {
                ...incoming,
                posts: [
                    ...(existing?.posts || []),
                    ...incoming.posts
                ]
            }
        }
    }
)