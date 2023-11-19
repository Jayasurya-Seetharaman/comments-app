import { PostProps } from "../types";

export function sortPostsByTimestamp(
    posts: PostProps[],
    sorBy: "asc" | "desc" = "asc"
  ) {
    return posts
      .sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return sorBy === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      })
      .map((post) => {
        if (post.replies) {
          post.replies = sortPostsByTimestamp(post.replies, sorBy);
        }
        return post;
      });
  }