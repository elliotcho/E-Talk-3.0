import { 
    PaginatedNotifications,
    PaginatedPosts
} from '../generated/graphql';

export const getPaginatedPostsPolicy = () => (
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

export const getPaginatedNotificationsPolicy = () => (
    {
        keyArgs: ['PaginatedNotifications'],
        merge(
            existing: PaginatedNotifications | undefined,
            incoming: PaginatedNotifications
        ) : PaginatedNotifications{
            return {
                ...incoming,
                notifications: [
                    ...(existing?.notifications || []),
                    ...incoming.notifications
                ]
            }
        }
    }
)