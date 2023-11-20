import { test as base } from '@playwright/test';
import { PostsPage } from './page-objects/Posts';

export const postsTest = base.extend<{ postsPage: PostsPage }>({
    postsPage: async ({ page }, use) => {
        const postsPage = new PostsPage(page);
        await postsPage.load();
        await use(postsPage);
    },
});