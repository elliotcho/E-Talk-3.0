export const mapPostProps = (post: any) => {
    const { id: userId, firstName, lastName, profileURL } = post.user;
    
    const props = {
        ...post,
        key: post.id,
        postId: post.id,
        profileURL,
        firstName,
        lastName,
        userId
    }

    delete props.user;
    return props;
}