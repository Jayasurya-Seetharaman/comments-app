import Posts from "../components/Posts";
import { postsStore } from "../stores/appStore";
import {
  sortBySelector,
  postsSelector,
  setSortBySelector,
} from "../stores/selector";
import { sortPostsByTimestamp } from "../utils";

export default function PostsController() {
  const sortBy = postsStore(sortBySelector);
  const posts = postsStore(postsSelector);
  const setSortBy = postsStore(setSortBySelector);
  const sortedPosts = sortPostsByTimestamp(posts, sortBy);
  return (
    <>
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
    </>
  );
}
