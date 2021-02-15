export const mapPostProps = (post: any) => {
    const { id: userId, firstName, lastName } = post.user;
    
    const props = {
        ...post,
        key: post.id,
        postId: post.id,
        firstName,
        lastName,
        userId
    }

    delete props.user;
    return props;
}