import { postsTest } from './helper';

postsTest('should render the application', async ({ postsPage }) => {
    await postsPage.expectApplicationToLoadAsExpected();
});

postsTest('user clicks post without name', async ({ postsPage }) => {
    await postsPage.expectApplicationToLoadAsExpected();
    await postsPage.proceedWithOutName();
    await postsPage.expectFormToThrowAnError();
});

postsTest('user clicks post without a message', async ({ postsPage }) => {
    await postsPage.expectApplicationToLoadAsExpected();
    await postsPage.proceedWithOutMessage();
    await postsPage.expectFormToThrowAnError();
});

postsTest('user posts the comment with a valid data', async ({ postsPage }) => {
    await postsPage.expectApplicationToLoadAsExpected();
    await postsPage.proceedWithValidData();
    await postsPage.expectTheSubmittedPostToBeVisible();
});

postsTest('user updating a post', async ({ postsPage }) => {
    await postsPage.expectApplicationToLoadAsExpected();
    await postsPage.proceedWithValidData();
    await postsPage.expectTheSubmittedPostToBeVisible();
    await postsPage.clickEditOnPost();
    await postsPage.expectEditFormToBeVisible();
    await postsPage.expectEditFormToHaveTheDisabledNameField();
    await postsPage.proceedWithEdit();
    await postsPage.expectTheEditedPostToBeVisible();
});

postsTest('user replies to a post', async ({ postsPage }) => {
    await postsPage.expectApplicationToLoadAsExpected();
    await postsPage.proceedWithValidData();
    await postsPage.expectTheSubmittedPostToBeVisible();
    await postsPage.clickReplyOnPost();
    await postsPage.expectReplyFormToBeVisible();
    await postsPage.proceedWithReply();
    await postsPage.expectTheReplyToBeVisible();
});

postsTest('user edits a reply', async ({ postsPage }) => {
    await postsPage.expectApplicationToLoadAsExpected();
    await postsPage.proceedWithValidData();
    await postsPage.expectTheSubmittedPostToBeVisible();
    await postsPage.clickReplyOnPost();
    await postsPage.expectReplyFormToBeVisible();
    await postsPage.proceedWithReply();
    await postsPage.expectTheReplyToBeVisible();
    await postsPage.clickEditOnReply();
    await postsPage.expectEditFormToBeVisible();
    await postsPage.proceedWithEdit();
    await postsPage.expectTheEditedPostToBeVisible();
});

postsTest('user deletes a post', async ({ postsPage }) => {
    await postsPage.expectApplicationToLoadAsExpected();
    await postsPage.proceedWithValidData();
    await postsPage.expectTheSubmittedPostToBeVisible();
    await postsPage.clickDeleteOnPost();
    await postsPage.expectThePostToBeDeleted();
});

postsTest('user deletes a reply', async ({ postsPage }) => {
    await postsPage.expectApplicationToLoadAsExpected();
    await postsPage.proceedWithValidData();
    await postsPage.expectTheSubmittedPostToBeVisible();
    await postsPage.clickReplyOnPost();
    await postsPage.expectReplyFormToBeVisible();
    await postsPage.proceedWithReply();
    await postsPage.expectTheReplyToBeVisible();
    await postsPage.clickDeleteOnReply();
    await postsPage.expectTheReplyToBeDeleted();
});