import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import { AppPersistentStore, AppStore } from '../types';

export const postsStore = create<AppPersistentStore>()(
    persist((set, get) => ({
        sortBy: 'asc',
        posts: [],
        setSortBy: (sortBy) => set({ sortBy }),
        addPost: (post) => set({ posts: [...get().posts, post] }),
        addReply: (reply, postId) => set({
            posts: get().posts.map((post) => {
                if (post.id === postId) {
                    return { ...post, replies: [...post.replies || [], reply] };
                }
                return post;
            }),
        }),
        editPost: (post) => set({
            posts: get().posts.map((p) => {
                if (p.id === post.id) {
                    return {
                        ...p,
                        ...post,
                    };
                }
                return p;
            }),
        }),
        editReply: (reply, replyId, postId) => set({
            posts: get().posts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        replies: post.replies?.map((r) => {
                            if (r.id === replyId) {
                                return {
                                    ...r,
                                    ...reply,
                                };
                            }
                            return r;
                        }),
                    };
                }
                return post;
            }),
        }),
        deletePost: (postId) => set({
            posts: get().posts.filter((post) => post.id !== postId),
        }),
        deleteReply: (replyId, postId) => set({
            posts: get().posts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        replies: post.replies?.filter((reply) => reply.id !== replyId),
                    };
                }
                return post;
            }),
        }),
    }), {
        name: 'comment-app-storage',
        storage: createJSONStorage(() => localStorage),
    })
)

export const appStore = create<AppStore>((set) => ({
    currentFocusReplyId: '',
    currentFocusEditId: '',
    setCurrentFocusReplyId: (id) => set({ currentFocusReplyId: id }),
    setCurrentFocusEditId: (id) => set({ currentFocusEditId: id }),
}));