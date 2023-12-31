export type CommonProps = {
    id: string;
    name: string;
    message: string;
    timestamp: string;
};

export type PostProps = CommonProps & {
    replies?: CommonProps[];
};

export type AppPersistentStore = {
    sortBy: 'asc' | 'desc';
    posts: PostProps[];
    addPost: (post: PostProps) => void;
    addReply: (reply: CommonProps, postId: string) => void;
    editPost: (post: PostProps) => void;
    editReply: (reply: CommonProps, replyId: string, postId: string) => void;
    deletePost: (postId: string) => void;
    deleteReply: (replyId: string, postId: string) => void;
    setSortBy: (sortBy: 'asc' | 'desc') => void;
};

export type AppStore = {
    currentFocusReplyId: string;
    setCurrentFocusReplyId: (replyId: string) => void;
    currentFocusEditId: string;
    setCurrentFocusEditId: (postId: string) => void;
}