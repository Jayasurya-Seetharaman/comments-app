import PostForm from "./components/PostForm";
import Posts from "./components/Posts";
import { postsStore } from "./stores/appStore";
import { sortPostsByTimestamp } from "./utils";

function App() {
  const { addPost, posts, sortBy, setSortBy } = postsStore();
  const sortedPosts = sortPostsByTimestamp(posts, sortBy);
  return (
    <div className="max-w-2xl m-auto">
      <h1 className="my-2">Comments App</h1>
      <PostForm headerText="Comment" onSubmit={addPost} />
      <div className="text-right mb-1">
        {sortedPosts.length > 0 && (
          <button
            onClick={() =>
              sortBy === "asc" ? setSortBy("desc") : setSortBy("asc")
            }
            data-testis="sort-button"
          >
            Sort By: Date and Time{" "}
            {sortBy === "asc" ? (
              <span>{"\u2193"}</span>
            ) : (
              <span>{"\u2191"}</span>
            )}
          </button>
        )}
      </div>
      <Posts type="comment" data={sortedPosts} />
    </div>
  );
}

export default App;
