import { useState } from "react";
import { CommonProps, PostProps } from "../types";
import PostForm from "./PostForm";
import { appStore } from "../stores/appStore";
import React from "react";

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
  const { addReply, editPost, editReply, deletePost, deleteReply } = appStore();
  const [currentFocusReplyId, setCurrentFocusReplyId] = useState("");
  const [currentFocusEditId, setCurrentFocusEditId] = useState("");
  const { type, data, postId } = props;

  const handleOnAddReplySubmit = (e: CommonProps, id: string) => {
    addReply(e, id);
    setCurrentFocusReplyId("");
  };

  const handleOnEditSubmit = (e: CommonProps, id: string) => {
    if (type === "comment") {
      editPost(e);
    } else {
      postId && editReply(e, id, postId);
    }
    setCurrentFocusEditId("");
  };

  const handleOnDelete = (id: string) => {
    if (type === "comment") {
      deletePost(id);
    } else {
      postId && deleteReply(id, postId);
    }
  };

  return (
    <div className="px-4 py-2 max-w-[600px] m-auto flex flex-col border border-[#EFEFEF] rounded-sm">
      {data.map((post) => {
        console.log("post.id", post.id);
        return (
          <React.Fragment key={post.id}>
            <div>
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
              <button
                className="text-blue-500"
                onClick={() => setCurrentFocusEditId(post.id)}
              >
                Edit
              </button>
              <button
                className="text-blue-500 ml-3"
                onClick={() => handleOnDelete(post.id)}
              >
                Delete
              </button>
            </div>
            {currentFocusReplyId === post.id && (
              <PostForm
                headerText="Reply"
                onSubmit={(e) => handleOnAddReplySubmit(e, post.id)}
              />
            )}
            {currentFocusEditId === post.id && (
              <PostForm
                id={post.id}
                headerText={type + " Edit"}
                initialName={post.name}
                initialMessage={post.message}
                isEdit={true}
                onSubmit={(e) => handleOnEditSubmit(e, post.id)}
              />
            )}
            {post.replies && post.replies.length > 0 && (
              <Posts type="reply" data={post.replies} postId={post.id} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
