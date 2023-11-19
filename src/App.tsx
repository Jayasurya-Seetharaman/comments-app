import PostForm from "./components/PostForm";
import Posts from "./components/Posts";
import { appStore } from "./stores/appStore";

function App() {
  const { addPost, posts } = appStore();
  posts.map((post) => {
    console.log("post", post);
    post.replies?.map((reply) => {
      console.log("reply", reply);
    });
  });
  return (
    <>
      <h1>Comments App</h1>
      <PostForm headerText="Comment" onSubmit={addPost} />
      <Posts type="comment" data={posts} />
    </>
  );
}

export default App;
