import { useState } from "react";
import { CommonProps, PostProps } from "../types";
import PostForm from "./PostForm";
import { appStore } from "../stores/appStore";

/* check if we can use discriminated unions to make this component more generic */
// type CommentPostProps = {
//   type: "comment";
//   data: PostsProps[];
//   postId: string;
// };

// type ReplyPostProps = {
//   type: "reply";
//   data: CommonProps[];
// };

// type PostsProps = CommentPostProps | ReplyPostProps;

type PostsProps = {
  type: "comment" | "reply";
  data: PostProps[];
  postId?: string;
};

export default function Posts(props: PostsProps) {
  const { addReply } = appStore();
  const [currentFocusReplyId, setCurrentFocusReplyId] = useState("");
  const { type, data, postId } = props;

  const handleOnAddReplySubmit = (e: CommonProps, id: string) => {
    addReply(e, id);
    setCurrentFocusReplyId("");
  };

  return (
    <div className="px-4 py-2 max-w-[600px] m-auto flex flex-col border border-[#EFEFEF] rounded-sm">
      {data.map((post) => {
        return (
          <>
            <div key={post.id}>
              <div>{post.name}</div>
              <div>{post.message}</div>
              <div>{post.timestamp}</div>
              {type === "comment" && (
                <button
                  onClick={() => setCurrentFocusReplyId(post.id)}
                  className="text-blue-500 mr-3"
                >
                  Reply
                </button>
              )}
              <button className="text-blue-500">Edit</button>
            </div>
            {currentFocusReplyId === post.id && (
              <PostForm
                headerText="Reply"
                onSubmit={(e) => handleOnAddReplySubmit(e, post.id)}
              />
            )}
            {post.replies && post.replies.length > 0 && (
              <Posts type="reply" data={post.replies} postId={post.id} />
            )}
          </>
        );
      })}
    </div>
  );
}
