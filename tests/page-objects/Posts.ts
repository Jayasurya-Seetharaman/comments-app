import { Page, expect } from '@playwright/test';

export class PostsPage {

    constructor(private readonly page: Page) {}

    async load() {
        await this.page.goto('http://localhost:5173/');
    }

    private async postComment() {
        await this.page.getByTestId('post-button').click();
    }

    async expectApplicationToLoadAsExpected() {
        await expect(this.page.getByTestId('post-form')).toBeVisible();
    }

    async proceedWithOutName() {
        await this.page.getByPlaceholder('Comment').fill('Commenting');
        await this.postComment();
    }

    async proceedWithOutMessage() {
        await this.page.getByPlaceholder('Name').fill('John Doe');
        await this.postComment();
    }

    async expectFormToThrowAnError() {
        await expect(this.page.getByTestId('error-message')).toBeVisible();
    }

    async proceedWithValidData() {
        await this.page.getByPlaceholder('Name').fill('John Doe');
        await this.page.getByPlaceholder('Comment').fill('Commenting');
        await this.postComment();
    }

    async expectTheSubmittedPostToBeVisible() {
        await expect(this.page.getByText('John Doe')).toBeVisible();
        await expect(this.page.getByText('Commenting')).toBeVisible();
    }
    
    async clickEditOnPost() {
        await this.page.getByTestId('comment-edit-button').click();
    }

    async expectEditFormToBeVisible() {
        await expect(this.page.getByTestId('edit-post-form')).toBeVisible();
    }

    async expectEditFormToHaveTheDisabledNameField() {
        await expect(this.page.getByTestId('edit-name-input')).toBeDisabled();
    }

    async proceedWithEdit() {
        await this.page.getByTestId('edit-message-input').fill('Message Edited');
        await this.page.getByTestId('update-post-button').click();
    }

    async expectTheEditedPostToBeVisible() {
        await expect(this.page.getByText('Message Edited')).toBeVisible();
    }

    async clickReplyOnPost() {
        await this.page.getByTestId('reply-button').click();
    }

    async expectReplyFormToBeVisible() {
        await expect(this.page.getByTestId('edit-post-form')).toBeVisible();
    }

    async proceedWithReply() {
        await this.page.getByTestId('edit-name-input').fill('Jack');
        await this.page.getByTestId('edit-message-input').fill('Replied to John');
        await this.page.getByTestId('update-post-button').click();
    }
    
    async expectTheReplyToBeVisible() {
        await expect(this.page.getByText('Jack', { exact: false })).toBeVisible();
        await expect(this.page.getByText('Replied to John')).toBeVisible();
    }

    async clickEditOnReply() {
        await this.page.getByTestId('reply-edit-button').click();
    }

    async clickDeleteOnPost() {
        await this.page.getByTestId('comment-delete-button').click();
    }

    async expectThePostToBeDeleted() {
        await expect(this.page.getByText('John Doe')).not.toBeVisible();
        await expect(this.page.getByText('Commenting')).not.toBeVisible();
    }

    async clickDeleteOnReply() {
        await this.page.getByTestId('reply-delete-button').click();
    }

    async expectTheReplyToBeDeleted() {
        await expect(this.page.getByText('Jack')).not.toBeVisible();
        await expect(this.page.getByText('Replied to John')).not.toBeVisible();
    }
}