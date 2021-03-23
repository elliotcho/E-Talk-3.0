export const filterSubscription = ({ context, payload } : any) => {
    const { req } = context.connection.context;
    const { uid } = req.session;

    context.req = req;

    return uid === payload.receiverId;
}