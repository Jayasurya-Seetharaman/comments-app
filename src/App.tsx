import PostFormController from "./controller/PostFormController";
import PostsController from "./controller/PostsController";

function App() {
  return (
    <div className="max-w-2xl m-auto">
      <PostFormController />
      <PostsController />
    </div>
  );
}

export default App;
