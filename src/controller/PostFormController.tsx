import PostForm from "../components/PostForm";
import { postsStore } from "../stores/appStore";
import { addPostSelector } from "../stores/selector";

export default function PostFormController() {
  const addPost = postsStore(addPostSelector);
  return (
    <>
      <h1 className="sm:mx-0 mx-3 my-2">Comments App</h1>
      <PostForm headerText="Comment" onSubmit={addPost} />
    </>
  );
}
