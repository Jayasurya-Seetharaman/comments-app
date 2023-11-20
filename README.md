## 💡 Outline

Create, design and implement a web-based application where the user can comment & reply. The application must allow the user to edit, delete and sort the comments and reply.

Demo:
https://www.loom.com/share/251147b9b2194683a1e28f01d3e4c351?sid=7e42aa4d-0ddf-4624-bd54-aed7f395d636

## Overview

**Functional goals**

These are the core functionalities for this app's usability.
  - Comment System: Allows users to add, edit, and delete comments and replies.
  - Data Validation & Persistence: Ensures valid user inputs and maintains comments across page refreshes using local storage.
  - Sorting Feature: Offers comment sorting by timestamp.

**Non-functional goals**

  - Responsiveness: Compatible with various devices and screen sizes.
  - Accessibility: Adheres to accessibility standards for broader usability.
  - Testing: Includes end to end testing.

## Architecture and design

Here are some important assumptions of the UI:
- Only one comment/reply can be edited at a time.
- Only one comment can be deleted at a time.
- Deleting a comment deletes all it's replies as well.
- Not keeping any chacracter length restrictions for the message and the name.
- We're considering the date & time only when the comment/reply is created and not when it's edited.
  
UI layout

<img width="1064" alt="ui-screenshot" src="https://github.com/Jayasurya-Seetharaman/comments-app/assets/22392903/e9c5615b-ff98-4edf-a909-63e04e63890d">

The layout has two major components:
- **PostForm**: It's where I render the form and all form validations are also has been handled here. The same component is reused to Edit Comment & Reply with the help of props.
- **Posts**: This is used to render the posts(both comments and replies), I've made this as a Recursive component as both the Comment & Reply looks the same.

And the folder structure looks like this:

<img width="298" alt="Screenshot 2023-11-20 at 10 20 21 PM" src="https://github.com/Jayasurya-Seetharaman/comments-app/assets/22392903/8ec65881-8e49-4a88-bf02-dffe4314e4a1">

**Local setupp**

To start the app
```
pnpm run dev
```

To run the test case
```
npx playwright test
```

**Library & usage**

I chose to go with `react` as the framework of choice. The react code base has been scaffolded with vite and pnpm using:

```
pnpm create vite comments-app --template react-ts
```
| Library name                                  | Usage                                                                                   |
| -------------------------------------------- | --------------------------------------------------------------------------------------- |
| [uuid](https://www.npmjs.com/package/uuid)                               | To generate unique ids for each post & reply                                                    |
| [zustand](https://zustand-demo.pmnd.rs/)                               | To maintain the store                                                |
| [TailwindCss](https://tailwindcss.com/)                               | For styling the component                                                |
| [Playwright](https://playwright.dev/)                               | For writing test cases                                                |


## Optimization & miscellaneous considerations

- Made sure the components are not re-rendering unnecessarily by maintaning the separation of concern between the ```<PostFormController /> & <PostsController />```.
- Introduced selectors to prevent the re-rendering from happening.
- Responsiveness has been handled, so even it works even in mobile.
- Accessibility has been handled.

## Testing QA

- Application is well tested manually & using test case.
- Used playwright to write end to end test cases.
- All the test cases are kept inside a ```tests``` folder.

**Deployments**

I used [Vercel](https://vercel.com/) for deployment needs.
The app has been hosted at (https://comments-app-taupe.vercel.app/)
