import PostForm from "./components/PostForm";
import { appStore } from "./stores/appStore";

function App() {
  const { addPost } = appStore();
  return (
    <>
      <h1>Comments App</h1>
      <PostForm headerText="Comment" onSubmit={addPost} />
      <p>CommentList will go here</p>
    </>
  );
}

export default App;
