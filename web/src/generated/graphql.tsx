import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  searchResults: Array<User>;
  user: User;
  me?: Maybe<User>;
  comments: Array<Comment>;
  likers: Array<User>;
  post: Post;
  userPosts: PaginatedPosts;
  posts: PaginatedPosts;
  chats: Array<Chat>;
  messages: Array<Message>;
  chat?: Maybe<Chat>;
  notifications: PaginatedNotifications;
  friendRequests: Array<User>;
  friends: Array<User>;
};


export type QuerySearchResultsArgs = {
  query: Scalars['String'];
};


export type QueryUserArgs = {
  userId: Scalars['Int'];
};


export type QueryCommentsArgs = {
  postId: Scalars['Int'];
};


export type QueryLikersArgs = {
  postId: Scalars['Int'];
};


export type QueryPostArgs = {
  postId: Scalars['Int'];
};


export type QueryUserPostsArgs = {
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  userId: Scalars['Int'];
};


export type QueryPostsArgs = {
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
};


export type QueryMessagesArgs = {
  chatId: Scalars['Int'];
};


export type QueryChatArgs = {
  chatId: Scalars['Int'];
};


export type QueryNotificationsArgs = {
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
};


export type QueryFriendsArgs = {
  userId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  profilePic: Scalars['String'];
  profileURL: Scalars['String'];
  bio: Scalars['String'];
  friendStatus: Scalars['Float'];
  isMe: Scalars['Boolean'];
  unreadFriendRequests: Scalars['Float'];
  unreadNotifications: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Float'];
  userId: Scalars['Float'];
  postId: Scalars['Float'];
  user: User;
  text: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  content: Scalars['String'];
  userId: Scalars['Float'];
  user: User;
  numLikes: Scalars['Float'];
  numComments: Scalars['Float'];
  likeStatus: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Chat = {
  __typename?: 'Chat';
  id: Scalars['Float'];
  isPrivate: Scalars['Boolean'];
  title: Scalars['String'];
  picture: Scalars['String'];
  lastMessage: Message;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Float'];
  text?: Maybe<Scalars['String']>;
  photoURL: Scalars['String'];
  userId: Scalars['Float'];
  chatId: Scalars['Float'];
  isRead: Scalars['Boolean'];
  user: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PaginatedNotifications = {
  __typename?: 'PaginatedNotifications';
  notifications: Array<Notification>;
  hasMore: Scalars['Boolean'];
};

export type Notification = {
  __typename?: 'Notification';
  senderId: Scalars['Float'];
  receiverId: Scalars['Float'];
  type: Scalars['String'];
  postId: Scalars['Float'];
  read: Scalars['Boolean'];
  text: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};


export type Mutation = {
  __typename?: 'Mutation';
  updateEmail: Scalars['Boolean'];
  updateName: Scalars['Boolean'];
  updateBio: Scalars['Boolean'];
  removeProfilePic: UserResponse;
  updateProfilePic: UserResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  editComment: Scalars['Boolean'];
  deleteComment: Scalars['Boolean'];
  createComment: Scalars['Boolean'];
  likePost: Scalars['Boolean'];
  editPost: Post;
  deletePost: Scalars['Boolean'];
  createPost: Post;
  readChat: Scalars['Boolean'];
  sendMessage: Scalars['Boolean'];
  createChat: Scalars['Int'];
  readNotifications: Scalars['Boolean'];
  readFriendRequests: Scalars['Boolean'];
  removeFriend: Scalars['Boolean'];
  acceptFriendRequest: Scalars['Boolean'];
  cancelFriendRequest: Scalars['Boolean'];
  declineFriendRequest: Scalars['Boolean'];
  sendFriendRequest: Scalars['Boolean'];
};


export type MutationUpdateEmailArgs = {
  newEmail: Scalars['String'];
};


export type MutationUpdateNameArgs = {
  lastName: Scalars['String'];
  firstName: Scalars['String'];
};


export type MutationUpdateBioArgs = {
  newBio: Scalars['String'];
};


export type MutationUpdateProfilePicArgs = {
  file: Scalars['Upload'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationEditCommentArgs = {
  newContent: Scalars['String'];
  commentId: Scalars['Int'];
};


export type MutationDeleteCommentArgs = {
  postId: Scalars['Int'];
  commentId: Scalars['Int'];
};


export type MutationCreateCommentArgs = {
  text: Scalars['String'];
  postId: Scalars['Int'];
};


export type MutationLikePostArgs = {
  postId: Scalars['Int'];
};


export type MutationEditPostArgs = {
  postId: Scalars['Int'];
  newContent: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  content: Scalars['String'];
};


export type MutationReadChatArgs = {
  chatId: Scalars['Int'];
};


export type MutationSendMessageArgs = {
  text?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['Upload']>;
  chatId: Scalars['Int'];
};


export type MutationCreateChatArgs = {
  text?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['Upload']>;
  members: Array<Scalars['Int']>;
};


export type MutationRemoveFriendArgs = {
  friendId: Scalars['Int'];
};


export type MutationAcceptFriendRequestArgs = {
  senderId: Scalars['Int'];
};


export type MutationCancelFriendRequestArgs = {
  receiverId: Scalars['Int'];
};


export type MutationDeclineFriendRequestArgs = {
  senderId: Scalars['Int'];
};


export type MutationSendFriendRequestArgs = {
  receiverId: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};


export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newComment: Notification;
  newLike: Notification;
  newFriendRequest: User;
  newFriend: Notification;
};

export type RegularChatFragment = (
  { __typename?: 'Chat' }
  & Pick<Chat, 'id' | 'picture' | 'title'>
  & { lastMessage: (
    { __typename?: 'Message' }
    & RegularMessageFragment
  ) }
);

export type RegularMessageFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'id' | 'text' | 'photoURL' | 'createdAt' | 'isRead' | 'userId' | 'chatId'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'isMe'>
    & RegularUserFragment
  ) }
);

export type RegularNotificationFragment = (
  { __typename?: 'Notification' }
  & Pick<Notification, 'text' | 'type' | 'createdAt' | 'receiverId' | 'senderId' | 'postId'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'profileURL' | 'firstName' | 'lastName'>
  ) }
);

export type RegularPostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'content' | 'createdAt' | 'likeStatus' | 'numComments' | 'numLikes'>
  & { user: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'friendStatus' | 'profileURL' | 'profilePic' | 'bio'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'unreadFriendRequests' | 'unreadNotifications'>
    & RegularUserFragment
  )>, errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>> }
);

export type CreateChatMutationVariables = Exact<{
  members: Array<Scalars['Int']> | Scalars['Int'];
  file?: Maybe<Scalars['Upload']>;
  text?: Maybe<Scalars['String']>;
}>;


export type CreateChatMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createChat'>
);

export type ReadChatMutationVariables = Exact<{
  chatId: Scalars['Int'];
}>;


export type ReadChatMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'readChat'>
);

export type SendMessageMutationVariables = Exact<{
  chatId: Scalars['Int'];
  file?: Maybe<Scalars['Upload']>;
  text?: Maybe<Scalars['String']>;
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendMessage'>
);

export type AcceptFriendRequestMutationVariables = Exact<{
  senderId: Scalars['Int'];
}>;


export type AcceptFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptFriendRequest'>
);

export type CancelFriendRequestMutationVariables = Exact<{
  receiverId: Scalars['Int'];
}>;


export type CancelFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'cancelFriendRequest'>
);

export type DeclineFriendRequestMutationVariables = Exact<{
  senderId: Scalars['Int'];
}>;


export type DeclineFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'declineFriendRequest'>
);

export type ReadFriendRequestsMutationVariables = Exact<{ [key: string]: never; }>;


export type ReadFriendRequestsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'readFriendRequests'>
);

export type RemoveFriendMutationVariables = Exact<{
  friendId: Scalars['Int'];
}>;


export type RemoveFriendMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeFriend'>
);

export type SendFriendRequestMutationVariables = Exact<{
  receiverId: Scalars['Int'];
}>;


export type SendFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendFriendRequest'>
);

export type ReadNotificationsMutationVariables = Exact<{ [key: string]: never; }>;


export type ReadNotificationsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'readNotifications'>
);

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['Int'];
  text: Scalars['String'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createComment'>
);

export type CreatePostMutationVariables = Exact<{
  content: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & RegularPostFragment
  ) }
);

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteComment'>
);

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type EditCommentMutationVariables = Exact<{
  commentId: Scalars['Int'];
  newContent: Scalars['String'];
}>;


export type EditCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editComment'>
);

export type EditPostMutationVariables = Exact<{
  newContent: Scalars['String'];
  postId: Scalars['Int'];
}>;


export type EditPostMutation = (
  { __typename?: 'Mutation' }
  & { editPost: (
    { __typename?: 'Post' }
    & RegularPostFragment
  ) }
);

export type LikePostMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type LikePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'likePost'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type RemoveProfilePicMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveProfilePicMutation = (
  { __typename?: 'Mutation' }
  & { removeProfilePic: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type UpdateBioMutationVariables = Exact<{
  newBio: Scalars['String'];
}>;


export type UpdateBioMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateBio'>
);

export type UpdateEmailMutationVariables = Exact<{
  newEmail: Scalars['String'];
}>;


export type UpdateEmailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateEmail'>
);

export type UpdateNameMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type UpdateNameMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateName'>
);

export type UpdateProfilePicMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UpdateProfilePicMutation = (
  { __typename?: 'Mutation' }
  & { updateProfilePic: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type ChatQueryVariables = Exact<{
  chatId: Scalars['Int'];
}>;


export type ChatQuery = (
  { __typename?: 'Query' }
  & { chat?: Maybe<(
    { __typename?: 'Chat' }
    & RegularChatFragment
  )> }
);

export type ChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChatsQuery = (
  { __typename?: 'Query' }
  & { chats: Array<(
    { __typename?: 'Chat' }
    & RegularChatFragment
  )> }
);

export type MessagesQueryVariables = Exact<{
  chatId: Scalars['Int'];
}>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'Message' }
    & RegularMessageFragment
  )> }
);

export type FriendRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendRequestsQuery = (
  { __typename?: 'Query' }
  & { friendRequests: Array<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type FriendsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type FriendsQuery = (
  { __typename?: 'Query' }
  & { friends: Array<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type NotificationsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type NotificationsQuery = (
  { __typename?: 'Query' }
  & { notifications: (
    { __typename?: 'PaginatedNotifications' }
    & Pick<PaginatedNotifications, 'hasMore'>
    & { notifications: Array<(
      { __typename?: 'Notification' }
      & RegularNotificationFragment
    )> }
  ) }
);

export type CommentsQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type CommentsQuery = (
  { __typename?: 'Query' }
  & { comments: Array<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'createdAt' | 'userId' | 'postId' | 'text'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'profileURL' | 'firstName' | 'lastName'>
    ) }
  )> }
);

export type LikersQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type LikersQuery = (
  { __typename?: 'Query' }
  & { likers: Array<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type PostQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post: (
    { __typename?: 'Post' }
    & RegularPostFragment
  ) }
);

export type PostsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & RegularPostFragment
    )> }
  ) }
);

export type UserPostsQueryVariables = Exact<{
  userId: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type UserPostsQuery = (
  { __typename?: 'Query' }
  & { userPosts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & RegularPostFragment
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'unreadFriendRequests' | 'unreadNotifications'>
    & RegularUserFragment
  )> }
);

export type SearchResultsQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchResultsQuery = (
  { __typename?: 'Query' }
  & { searchResults: Array<(
    { __typename?: 'User' }
    & Pick<User, 'isMe'>
    & RegularUserFragment
  )> }
);

export type UserQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'isMe'>
    & RegularUserFragment
  ) }
);

export type NewFriendSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewFriendSubscription = (
  { __typename?: 'Subscription' }
  & { newFriend: (
    { __typename?: 'Notification' }
    & RegularNotificationFragment
  ) }
);

export type NewFriendRequestSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewFriendRequestSubscription = (
  { __typename?: 'Subscription' }
  & { newFriendRequest: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type NewCommentSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewCommentSubscription = (
  { __typename?: 'Subscription' }
  & { newComment: (
    { __typename?: 'Notification' }
    & RegularNotificationFragment
  ) }
);

export type NewLikeSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewLikeSubscription = (
  { __typename?: 'Subscription' }
  & { newLike: (
    { __typename?: 'Notification' }
    & RegularNotificationFragment
  ) }
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  email
  firstName
  lastName
  friendStatus
  profileURL
  profilePic
  bio
}
    `;
export const RegularMessageFragmentDoc = gql`
    fragment RegularMessage on Message {
  id
  text
  photoURL
  createdAt
  isRead
  userId
  chatId
  user {
    isMe
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const RegularChatFragmentDoc = gql`
    fragment RegularChat on Chat {
  id
  picture
  title
  lastMessage {
    ...RegularMessage
  }
}
    ${RegularMessageFragmentDoc}`;
export const RegularNotificationFragmentDoc = gql`
    fragment RegularNotification on Notification {
  text
  type
  createdAt
  receiverId
  senderId
  postId
  user {
    id
    profileURL
    firstName
    lastName
  }
}
    `;
export const RegularPostFragmentDoc = gql`
    fragment RegularPost on Post {
  id
  content
  createdAt
  likeStatus
  numComments
  numLikes
  user {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  user {
    unreadFriendRequests
    unreadNotifications
    ...RegularUser
  }
  errors {
    ...RegularError
  }
}
    ${RegularUserFragmentDoc}
${RegularErrorFragmentDoc}`;
export const CreateChatDocument = gql`
    mutation CreateChat($members: [Int!]!, $file: Upload, $text: String) {
  createChat(members: $members, file: $file, text: $text)
}
    `;
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      members: // value for 'members'
 *      file: // value for 'file'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, baseOptions);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;
export const ReadChatDocument = gql`
    mutation ReadChat($chatId: Int!) {
  readChat(chatId: $chatId)
}
    `;
export type ReadChatMutationFn = Apollo.MutationFunction<ReadChatMutation, ReadChatMutationVariables>;

/**
 * __useReadChatMutation__
 *
 * To run a mutation, you first call `useReadChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readChatMutation, { data, loading, error }] = useReadChatMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useReadChatMutation(baseOptions?: Apollo.MutationHookOptions<ReadChatMutation, ReadChatMutationVariables>) {
        return Apollo.useMutation<ReadChatMutation, ReadChatMutationVariables>(ReadChatDocument, baseOptions);
      }
export type ReadChatMutationHookResult = ReturnType<typeof useReadChatMutation>;
export type ReadChatMutationResult = Apollo.MutationResult<ReadChatMutation>;
export type ReadChatMutationOptions = Apollo.BaseMutationOptions<ReadChatMutation, ReadChatMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($chatId: Int!, $file: Upload, $text: String) {
  sendMessage(chatId: $chatId, file: $file, text: $text)
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      file: // value for 'file'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, baseOptions);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($senderId: Int!) {
  acceptFriendRequest(senderId: $senderId)
}
    `;
export type AcceptFriendRequestMutationFn = Apollo.MutationFunction<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;

/**
 * __useAcceptFriendRequestMutation__
 *
 * To run a mutation, you first call `useAcceptFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendRequestMutation, { data, loading, error }] = useAcceptFriendRequestMutation({
 *   variables: {
 *      senderId: // value for 'senderId'
 *   },
 * });
 */
export function useAcceptFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>) {
        return Apollo.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument, baseOptions);
      }
export type AcceptFriendRequestMutationHookResult = ReturnType<typeof useAcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationResult = Apollo.MutationResult<AcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationOptions = Apollo.BaseMutationOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;
export const CancelFriendRequestDocument = gql`
    mutation CancelFriendRequest($receiverId: Int!) {
  cancelFriendRequest(receiverId: $receiverId)
}
    `;
export type CancelFriendRequestMutationFn = Apollo.MutationFunction<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>;

/**
 * __useCancelFriendRequestMutation__
 *
 * To run a mutation, you first call `useCancelFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelFriendRequestMutation, { data, loading, error }] = useCancelFriendRequestMutation({
 *   variables: {
 *      receiverId: // value for 'receiverId'
 *   },
 * });
 */
export function useCancelFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>) {
        return Apollo.useMutation<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>(CancelFriendRequestDocument, baseOptions);
      }
export type CancelFriendRequestMutationHookResult = ReturnType<typeof useCancelFriendRequestMutation>;
export type CancelFriendRequestMutationResult = Apollo.MutationResult<CancelFriendRequestMutation>;
export type CancelFriendRequestMutationOptions = Apollo.BaseMutationOptions<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>;
export const DeclineFriendRequestDocument = gql`
    mutation DeclineFriendRequest($senderId: Int!) {
  declineFriendRequest(senderId: $senderId)
}
    `;
export type DeclineFriendRequestMutationFn = Apollo.MutationFunction<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>;

/**
 * __useDeclineFriendRequestMutation__
 *
 * To run a mutation, you first call `useDeclineFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineFriendRequestMutation, { data, loading, error }] = useDeclineFriendRequestMutation({
 *   variables: {
 *      senderId: // value for 'senderId'
 *   },
 * });
 */
export function useDeclineFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>) {
        return Apollo.useMutation<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>(DeclineFriendRequestDocument, baseOptions);
      }
export type DeclineFriendRequestMutationHookResult = ReturnType<typeof useDeclineFriendRequestMutation>;
export type DeclineFriendRequestMutationResult = Apollo.MutationResult<DeclineFriendRequestMutation>;
export type DeclineFriendRequestMutationOptions = Apollo.BaseMutationOptions<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>;
export const ReadFriendRequestsDocument = gql`
    mutation ReadFriendRequests {
  readFriendRequests
}
    `;
export type ReadFriendRequestsMutationFn = Apollo.MutationFunction<ReadFriendRequestsMutation, ReadFriendRequestsMutationVariables>;

/**
 * __useReadFriendRequestsMutation__
 *
 * To run a mutation, you first call `useReadFriendRequestsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadFriendRequestsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readFriendRequestsMutation, { data, loading, error }] = useReadFriendRequestsMutation({
 *   variables: {
 *   },
 * });
 */
export function useReadFriendRequestsMutation(baseOptions?: Apollo.MutationHookOptions<ReadFriendRequestsMutation, ReadFriendRequestsMutationVariables>) {
        return Apollo.useMutation<ReadFriendRequestsMutation, ReadFriendRequestsMutationVariables>(ReadFriendRequestsDocument, baseOptions);
      }
export type ReadFriendRequestsMutationHookResult = ReturnType<typeof useReadFriendRequestsMutation>;
export type ReadFriendRequestsMutationResult = Apollo.MutationResult<ReadFriendRequestsMutation>;
export type ReadFriendRequestsMutationOptions = Apollo.BaseMutationOptions<ReadFriendRequestsMutation, ReadFriendRequestsMutationVariables>;
export const RemoveFriendDocument = gql`
    mutation RemoveFriend($friendId: Int!) {
  removeFriend(friendId: $friendId)
}
    `;
export type RemoveFriendMutationFn = Apollo.MutationFunction<RemoveFriendMutation, RemoveFriendMutationVariables>;

/**
 * __useRemoveFriendMutation__
 *
 * To run a mutation, you first call `useRemoveFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFriendMutation, { data, loading, error }] = useRemoveFriendMutation({
 *   variables: {
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useRemoveFriendMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFriendMutation, RemoveFriendMutationVariables>) {
        return Apollo.useMutation<RemoveFriendMutation, RemoveFriendMutationVariables>(RemoveFriendDocument, baseOptions);
      }
export type RemoveFriendMutationHookResult = ReturnType<typeof useRemoveFriendMutation>;
export type RemoveFriendMutationResult = Apollo.MutationResult<RemoveFriendMutation>;
export type RemoveFriendMutationOptions = Apollo.BaseMutationOptions<RemoveFriendMutation, RemoveFriendMutationVariables>;
export const SendFriendRequestDocument = gql`
    mutation SendFriendRequest($receiverId: Int!) {
  sendFriendRequest(receiverId: $receiverId)
}
    `;
export type SendFriendRequestMutationFn = Apollo.MutationFunction<SendFriendRequestMutation, SendFriendRequestMutationVariables>;

/**
 * __useSendFriendRequestMutation__
 *
 * To run a mutation, you first call `useSendFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFriendRequestMutation, { data, loading, error }] = useSendFriendRequestMutation({
 *   variables: {
 *      receiverId: // value for 'receiverId'
 *   },
 * });
 */
export function useSendFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>) {
        return Apollo.useMutation<SendFriendRequestMutation, SendFriendRequestMutationVariables>(SendFriendRequestDocument, baseOptions);
      }
export type SendFriendRequestMutationHookResult = ReturnType<typeof useSendFriendRequestMutation>;
export type SendFriendRequestMutationResult = Apollo.MutationResult<SendFriendRequestMutation>;
export type SendFriendRequestMutationOptions = Apollo.BaseMutationOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>;
export const ReadNotificationsDocument = gql`
    mutation ReadNotifications {
  readNotifications
}
    `;
export type ReadNotificationsMutationFn = Apollo.MutationFunction<ReadNotificationsMutation, ReadNotificationsMutationVariables>;

/**
 * __useReadNotificationsMutation__
 *
 * To run a mutation, you first call `useReadNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readNotificationsMutation, { data, loading, error }] = useReadNotificationsMutation({
 *   variables: {
 *   },
 * });
 */
export function useReadNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<ReadNotificationsMutation, ReadNotificationsMutationVariables>) {
        return Apollo.useMutation<ReadNotificationsMutation, ReadNotificationsMutationVariables>(ReadNotificationsDocument, baseOptions);
      }
export type ReadNotificationsMutationHookResult = ReturnType<typeof useReadNotificationsMutation>;
export type ReadNotificationsMutationResult = Apollo.MutationResult<ReadNotificationsMutation>;
export type ReadNotificationsMutationOptions = Apollo.BaseMutationOptions<ReadNotificationsMutation, ReadNotificationsMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($postId: Int!, $text: String!) {
  createComment(postId: $postId, text: $text)
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, baseOptions);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($content: String!) {
  createPost(content: $content) {
    ...RegularPost
  }
}
    ${RegularPostFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: Int!, $postId: Int!) {
  deleteComment(commentId: $commentId, postId: $postId)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, baseOptions);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: Int!) {
  deletePost(postId: $postId)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const EditCommentDocument = gql`
    mutation EditComment($commentId: Int!, $newContent: String!) {
  editComment(commentId: $commentId, newContent: $newContent)
}
    `;
export type EditCommentMutationFn = Apollo.MutationFunction<EditCommentMutation, EditCommentMutationVariables>;

/**
 * __useEditCommentMutation__
 *
 * To run a mutation, you first call `useEditCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCommentMutation, { data, loading, error }] = useEditCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      newContent: // value for 'newContent'
 *   },
 * });
 */
export function useEditCommentMutation(baseOptions?: Apollo.MutationHookOptions<EditCommentMutation, EditCommentMutationVariables>) {
        return Apollo.useMutation<EditCommentMutation, EditCommentMutationVariables>(EditCommentDocument, baseOptions);
      }
export type EditCommentMutationHookResult = ReturnType<typeof useEditCommentMutation>;
export type EditCommentMutationResult = Apollo.MutationResult<EditCommentMutation>;
export type EditCommentMutationOptions = Apollo.BaseMutationOptions<EditCommentMutation, EditCommentMutationVariables>;
export const EditPostDocument = gql`
    mutation EditPost($newContent: String!, $postId: Int!) {
  editPost(newContent: $newContent, postId: $postId) {
    ...RegularPost
  }
}
    ${RegularPostFragmentDoc}`;
export type EditPostMutationFn = Apollo.MutationFunction<EditPostMutation, EditPostMutationVariables>;

/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostMutation, { data, loading, error }] = useEditPostMutation({
 *   variables: {
 *      newContent: // value for 'newContent'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useEditPostMutation(baseOptions?: Apollo.MutationHookOptions<EditPostMutation, EditPostMutationVariables>) {
        return Apollo.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, baseOptions);
      }
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = Apollo.BaseMutationOptions<EditPostMutation, EditPostMutationVariables>;
export const LikePostDocument = gql`
    mutation LikePost($postId: Int!) {
  likePost(postId: $postId)
}
    `;
export type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, baseOptions);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveProfilePicDocument = gql`
    mutation RemoveProfilePic {
  removeProfilePic {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RemoveProfilePicMutationFn = Apollo.MutationFunction<RemoveProfilePicMutation, RemoveProfilePicMutationVariables>;

/**
 * __useRemoveProfilePicMutation__
 *
 * To run a mutation, you first call `useRemoveProfilePicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProfilePicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProfilePicMutation, { data, loading, error }] = useRemoveProfilePicMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveProfilePicMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProfilePicMutation, RemoveProfilePicMutationVariables>) {
        return Apollo.useMutation<RemoveProfilePicMutation, RemoveProfilePicMutationVariables>(RemoveProfilePicDocument, baseOptions);
      }
export type RemoveProfilePicMutationHookResult = ReturnType<typeof useRemoveProfilePicMutation>;
export type RemoveProfilePicMutationResult = Apollo.MutationResult<RemoveProfilePicMutation>;
export type RemoveProfilePicMutationOptions = Apollo.BaseMutationOptions<RemoveProfilePicMutation, RemoveProfilePicMutationVariables>;
export const UpdateBioDocument = gql`
    mutation UpdateBio($newBio: String!) {
  updateBio(newBio: $newBio)
}
    `;
export type UpdateBioMutationFn = Apollo.MutationFunction<UpdateBioMutation, UpdateBioMutationVariables>;

/**
 * __useUpdateBioMutation__
 *
 * To run a mutation, you first call `useUpdateBioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBioMutation, { data, loading, error }] = useUpdateBioMutation({
 *   variables: {
 *      newBio: // value for 'newBio'
 *   },
 * });
 */
export function useUpdateBioMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBioMutation, UpdateBioMutationVariables>) {
        return Apollo.useMutation<UpdateBioMutation, UpdateBioMutationVariables>(UpdateBioDocument, baseOptions);
      }
export type UpdateBioMutationHookResult = ReturnType<typeof useUpdateBioMutation>;
export type UpdateBioMutationResult = Apollo.MutationResult<UpdateBioMutation>;
export type UpdateBioMutationOptions = Apollo.BaseMutationOptions<UpdateBioMutation, UpdateBioMutationVariables>;
export const UpdateEmailDocument = gql`
    mutation UpdateEmail($newEmail: String!) {
  updateEmail(newEmail: $newEmail)
}
    `;
export type UpdateEmailMutationFn = Apollo.MutationFunction<UpdateEmailMutation, UpdateEmailMutationVariables>;

/**
 * __useUpdateEmailMutation__
 *
 * To run a mutation, you first call `useUpdateEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmailMutation, { data, loading, error }] = useUpdateEmailMutation({
 *   variables: {
 *      newEmail: // value for 'newEmail'
 *   },
 * });
 */
export function useUpdateEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEmailMutation, UpdateEmailMutationVariables>) {
        return Apollo.useMutation<UpdateEmailMutation, UpdateEmailMutationVariables>(UpdateEmailDocument, baseOptions);
      }
export type UpdateEmailMutationHookResult = ReturnType<typeof useUpdateEmailMutation>;
export type UpdateEmailMutationResult = Apollo.MutationResult<UpdateEmailMutation>;
export type UpdateEmailMutationOptions = Apollo.BaseMutationOptions<UpdateEmailMutation, UpdateEmailMutationVariables>;
export const UpdateNameDocument = gql`
    mutation UpdateName($firstName: String!, $lastName: String!) {
  updateName(firstName: $firstName, lastName: $lastName)
}
    `;
export type UpdateNameMutationFn = Apollo.MutationFunction<UpdateNameMutation, UpdateNameMutationVariables>;

/**
 * __useUpdateNameMutation__
 *
 * To run a mutation, you first call `useUpdateNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNameMutation, { data, loading, error }] = useUpdateNameMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useUpdateNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNameMutation, UpdateNameMutationVariables>) {
        return Apollo.useMutation<UpdateNameMutation, UpdateNameMutationVariables>(UpdateNameDocument, baseOptions);
      }
export type UpdateNameMutationHookResult = ReturnType<typeof useUpdateNameMutation>;
export type UpdateNameMutationResult = Apollo.MutationResult<UpdateNameMutation>;
export type UpdateNameMutationOptions = Apollo.BaseMutationOptions<UpdateNameMutation, UpdateNameMutationVariables>;
export const UpdateProfilePicDocument = gql`
    mutation UpdateProfilePic($file: Upload!) {
  updateProfilePic(file: $file) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type UpdateProfilePicMutationFn = Apollo.MutationFunction<UpdateProfilePicMutation, UpdateProfilePicMutationVariables>;

/**
 * __useUpdateProfilePicMutation__
 *
 * To run a mutation, you first call `useUpdateProfilePicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfilePicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfilePicMutation, { data, loading, error }] = useUpdateProfilePicMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUpdateProfilePicMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfilePicMutation, UpdateProfilePicMutationVariables>) {
        return Apollo.useMutation<UpdateProfilePicMutation, UpdateProfilePicMutationVariables>(UpdateProfilePicDocument, baseOptions);
      }
export type UpdateProfilePicMutationHookResult = ReturnType<typeof useUpdateProfilePicMutation>;
export type UpdateProfilePicMutationResult = Apollo.MutationResult<UpdateProfilePicMutation>;
export type UpdateProfilePicMutationOptions = Apollo.BaseMutationOptions<UpdateProfilePicMutation, UpdateProfilePicMutationVariables>;
export const ChatDocument = gql`
    query Chat($chatId: Int!) {
  chat(chatId: $chatId) {
    ...RegularChat
  }
}
    ${RegularChatFragmentDoc}`;

/**
 * __useChatQuery__
 *
 * To run a query within a React component, call `useChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useChatQuery(baseOptions: Apollo.QueryHookOptions<ChatQuery, ChatQueryVariables>) {
        return Apollo.useQuery<ChatQuery, ChatQueryVariables>(ChatDocument, baseOptions);
      }
export function useChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatQuery, ChatQueryVariables>) {
          return Apollo.useLazyQuery<ChatQuery, ChatQueryVariables>(ChatDocument, baseOptions);
        }
export type ChatQueryHookResult = ReturnType<typeof useChatQuery>;
export type ChatLazyQueryHookResult = ReturnType<typeof useChatLazyQuery>;
export type ChatQueryResult = Apollo.QueryResult<ChatQuery, ChatQueryVariables>;
export const ChatsDocument = gql`
    query Chats {
  chats {
    ...RegularChat
  }
}
    ${RegularChatFragmentDoc}`;

/**
 * __useChatsQuery__
 *
 * To run a query within a React component, call `useChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useChatsQuery(baseOptions?: Apollo.QueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
        return Apollo.useQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, baseOptions);
      }
export function useChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
          return Apollo.useLazyQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, baseOptions);
        }
export type ChatsQueryHookResult = ReturnType<typeof useChatsQuery>;
export type ChatsLazyQueryHookResult = ReturnType<typeof useChatsLazyQuery>;
export type ChatsQueryResult = Apollo.QueryResult<ChatsQuery, ChatsQueryVariables>;
export const MessagesDocument = gql`
    query Messages($chatId: Int!) {
  messages(chatId: $chatId) {
    ...RegularMessage
  }
}
    ${RegularMessageFragmentDoc}`;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const FriendRequestsDocument = gql`
    query FriendRequests {
  friendRequests {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useFriendRequestsQuery__
 *
 * To run a query within a React component, call `useFriendRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendRequestsQuery(baseOptions?: Apollo.QueryHookOptions<FriendRequestsQuery, FriendRequestsQueryVariables>) {
        return Apollo.useQuery<FriendRequestsQuery, FriendRequestsQueryVariables>(FriendRequestsDocument, baseOptions);
      }
export function useFriendRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendRequestsQuery, FriendRequestsQueryVariables>) {
          return Apollo.useLazyQuery<FriendRequestsQuery, FriendRequestsQueryVariables>(FriendRequestsDocument, baseOptions);
        }
export type FriendRequestsQueryHookResult = ReturnType<typeof useFriendRequestsQuery>;
export type FriendRequestsLazyQueryHookResult = ReturnType<typeof useFriendRequestsLazyQuery>;
export type FriendRequestsQueryResult = Apollo.QueryResult<FriendRequestsQuery, FriendRequestsQueryVariables>;
export const FriendsDocument = gql`
    query Friends($userId: Int!) {
  friends(userId: $userId) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useFriendsQuery__
 *
 * To run a query within a React component, call `useFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFriendsQuery(baseOptions: Apollo.QueryHookOptions<FriendsQuery, FriendsQueryVariables>) {
        return Apollo.useQuery<FriendsQuery, FriendsQueryVariables>(FriendsDocument, baseOptions);
      }
export function useFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendsQuery, FriendsQueryVariables>) {
          return Apollo.useLazyQuery<FriendsQuery, FriendsQueryVariables>(FriendsDocument, baseOptions);
        }
export type FriendsQueryHookResult = ReturnType<typeof useFriendsQuery>;
export type FriendsLazyQueryHookResult = ReturnType<typeof useFriendsLazyQuery>;
export type FriendsQueryResult = Apollo.QueryResult<FriendsQuery, FriendsQueryVariables>;
export const NotificationsDocument = gql`
    query Notifications($cursor: String, $limit: Int!) {
  notifications(cursor: $cursor, limit: $limit) {
    hasMore
    notifications {
      ...RegularNotification
    }
  }
}
    ${RegularNotificationFragmentDoc}`;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, baseOptions);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, baseOptions);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const CommentsDocument = gql`
    query Comments($postId: Int!) {
  comments(postId: $postId) {
    id
    createdAt
    userId
    postId
    text
    user {
      id
      profileURL
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, baseOptions);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, baseOptions);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const LikersDocument = gql`
    query Likers($postId: Int!) {
  likers(postId: $postId) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useLikersQuery__
 *
 * To run a query within a React component, call `useLikersQuery` and pass it any options that fit your needs.
 * When your component renders, `useLikersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLikersQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikersQuery(baseOptions: Apollo.QueryHookOptions<LikersQuery, LikersQueryVariables>) {
        return Apollo.useQuery<LikersQuery, LikersQueryVariables>(LikersDocument, baseOptions);
      }
export function useLikersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LikersQuery, LikersQueryVariables>) {
          return Apollo.useLazyQuery<LikersQuery, LikersQueryVariables>(LikersDocument, baseOptions);
        }
export type LikersQueryHookResult = ReturnType<typeof useLikersQuery>;
export type LikersLazyQueryHookResult = ReturnType<typeof useLikersLazyQuery>;
export type LikersQueryResult = Apollo.QueryResult<LikersQuery, LikersQueryVariables>;
export const PostDocument = gql`
    query Post($postId: Int!) {
  post(postId: $postId) {
    ...RegularPost
  }
}
    ${RegularPostFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts($cursor: String, $limit: Int!) {
  posts(cursor: $cursor, limit: $limit) {
    hasMore
    posts {
      ...RegularPost
    }
  }
}
    ${RegularPostFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const UserPostsDocument = gql`
    query UserPosts($userId: Int!, $cursor: String, $limit: Int!) {
  userPosts(userId: $userId, cursor: $cursor, limit: $limit) {
    hasMore
    posts {
      ...RegularPost
    }
  }
}
    ${RegularPostFragmentDoc}`;

/**
 * __useUserPostsQuery__
 *
 * To run a query within a React component, call `useUserPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPostsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useUserPostsQuery(baseOptions: Apollo.QueryHookOptions<UserPostsQuery, UserPostsQueryVariables>) {
        return Apollo.useQuery<UserPostsQuery, UserPostsQueryVariables>(UserPostsDocument, baseOptions);
      }
export function useUserPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserPostsQuery, UserPostsQueryVariables>) {
          return Apollo.useLazyQuery<UserPostsQuery, UserPostsQueryVariables>(UserPostsDocument, baseOptions);
        }
export type UserPostsQueryHookResult = ReturnType<typeof useUserPostsQuery>;
export type UserPostsLazyQueryHookResult = ReturnType<typeof useUserPostsLazyQuery>;
export type UserPostsQueryResult = Apollo.QueryResult<UserPostsQuery, UserPostsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
    unreadFriendRequests
    unreadNotifications
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SearchResultsDocument = gql`
    query SearchResults($query: String!) {
  searchResults(query: $query) {
    isMe
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useSearchResultsQuery__
 *
 * To run a query within a React component, call `useSearchResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchResultsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchResultsQuery(baseOptions: Apollo.QueryHookOptions<SearchResultsQuery, SearchResultsQueryVariables>) {
        return Apollo.useQuery<SearchResultsQuery, SearchResultsQueryVariables>(SearchResultsDocument, baseOptions);
      }
export function useSearchResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchResultsQuery, SearchResultsQueryVariables>) {
          return Apollo.useLazyQuery<SearchResultsQuery, SearchResultsQueryVariables>(SearchResultsDocument, baseOptions);
        }
export type SearchResultsQueryHookResult = ReturnType<typeof useSearchResultsQuery>;
export type SearchResultsLazyQueryHookResult = ReturnType<typeof useSearchResultsLazyQuery>;
export type SearchResultsQueryResult = Apollo.QueryResult<SearchResultsQuery, SearchResultsQueryVariables>;
export const UserDocument = gql`
    query User($userId: Int!) {
  user(userId: $userId) {
    isMe
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const NewFriendDocument = gql`
    subscription NewFriend {
  newFriend {
    ...RegularNotification
  }
}
    ${RegularNotificationFragmentDoc}`;

/**
 * __useNewFriendSubscription__
 *
 * To run a query within a React component, call `useNewFriendSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewFriendSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewFriendSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewFriendSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewFriendSubscription, NewFriendSubscriptionVariables>) {
        return Apollo.useSubscription<NewFriendSubscription, NewFriendSubscriptionVariables>(NewFriendDocument, baseOptions);
      }
export type NewFriendSubscriptionHookResult = ReturnType<typeof useNewFriendSubscription>;
export type NewFriendSubscriptionResult = Apollo.SubscriptionResult<NewFriendSubscription>;
export const NewFriendRequestDocument = gql`
    subscription NewFriendRequest {
  newFriendRequest {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useNewFriendRequestSubscription__
 *
 * To run a query within a React component, call `useNewFriendRequestSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewFriendRequestSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewFriendRequestSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewFriendRequestSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewFriendRequestSubscription, NewFriendRequestSubscriptionVariables>) {
        return Apollo.useSubscription<NewFriendRequestSubscription, NewFriendRequestSubscriptionVariables>(NewFriendRequestDocument, baseOptions);
      }
export type NewFriendRequestSubscriptionHookResult = ReturnType<typeof useNewFriendRequestSubscription>;
export type NewFriendRequestSubscriptionResult = Apollo.SubscriptionResult<NewFriendRequestSubscription>;
export const NewCommentDocument = gql`
    subscription NewComment {
  newComment {
    ...RegularNotification
  }
}
    ${RegularNotificationFragmentDoc}`;

/**
 * __useNewCommentSubscription__
 *
 * To run a query within a React component, call `useNewCommentSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewCommentSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewCommentSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewCommentSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewCommentSubscription, NewCommentSubscriptionVariables>) {
        return Apollo.useSubscription<NewCommentSubscription, NewCommentSubscriptionVariables>(NewCommentDocument, baseOptions);
      }
export type NewCommentSubscriptionHookResult = ReturnType<typeof useNewCommentSubscription>;
export type NewCommentSubscriptionResult = Apollo.SubscriptionResult<NewCommentSubscription>;
export const NewLikeDocument = gql`
    subscription NewLike {
  newLike {
    ...RegularNotification
  }
}
    ${RegularNotificationFragmentDoc}`;

/**
 * __useNewLikeSubscription__
 *
 * To run a query within a React component, call `useNewLikeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewLikeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewLikeSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewLikeSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewLikeSubscription, NewLikeSubscriptionVariables>) {
        return Apollo.useSubscription<NewLikeSubscription, NewLikeSubscriptionVariables>(NewLikeDocument, baseOptions);
      }
export type NewLikeSubscriptionHookResult = ReturnType<typeof useNewLikeSubscription>;
export type NewLikeSubscriptionResult = Apollo.SubscriptionResult<NewLikeSubscription>;