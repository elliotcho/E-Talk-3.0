export const mapPostProps = (post: any) => {
    const { id: userId, firstName, lastName, url } = post.user;
    
    const props = {
        ...post,
        key: post.id,
        postId: post.id,
        userURL: url,
        firstName,
        lastName,
        userId
    }

    delete props.user;
    return props;
}