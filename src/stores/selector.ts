import { AppPersistentStore } from "../types";

export const addPostSelector = (state: AppPersistentStore) => state.addPost;
export const sortBySelector = (state: AppPersistentStore) => state.sortBy;
export const postsSelector = (state: AppPersistentStore) => state.posts;
export const setSortBySelector = (state: AppPersistentStore) => state.setSortBy;
