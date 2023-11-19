import { CommonProps, PostProps } from "../types";
import PostForm from "./PostForm";
import { appPersistentStore, appStore } from "../stores/appStore";
import { formatDate } from "../utils/dateTime";
import { classNames } from "../utils/classNames";
import { useCallback, useEffect, useRef } from "react";

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
  const { addReply, editPost, editReply, deletePost, deleteReply } =
    appPersistentStore();
  const {
    currentFocusEditId,
    currentFocusReplyId,
    setCurrentFocusEditId,
    setCurrentFocusReplyId,
  } = appStore();

  const formRef = useRef<HTMLDivElement>(null);

  const { type, data, postId } = props;

  const handleOnReplySubmit = useCallback(
    (e: CommonProps, id: string) => {
      addReply(e, id);
      setCurrentFocusReplyId("");
    },
    [addReply, setCurrentFocusReplyId]
  );

  const handleOnEditSubmit = useCallback(
    (e: CommonProps, id: string) => {
      if (type === "comment") {
        editPost(e);
      } else {
        postId && editReply(e, id, postId);
      }
      setCurrentFocusEditId("");
    },
    [editPost, editReply, postId, setCurrentFocusEditId, type]
  );

  const handleOnDelete = useCallback(
    (id: string) => {
      if (type === "comment") {
        deletePost(id);
      } else {
        postId && deleteReply(id, postId);
      }
    },
    [deletePost, deleteReply, postId, type]
  );

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentFocusReplyId, currentFocusEditId]);

  return (
    <div className="m-auto flex flex-col rounded-sm">
      {data.map((post) => {
        return (
          <div key={post.id}>
            <div
              className={classNames(
                "bg-[#F6F6F6] max-w[600px] px-4 py-2 rounded-sm mb-2 border border-[#EFEFEF] relative",
                {
                  "ml-16": type === "reply",
                }
              )}
            >
              <div className="flex justify-between">
                <div className="truncate w-[calc(100%-120px)]">
                  <b>{post.name}</b>
                </div>
                <div>{formatDate(post.timestamp)}</div>
              </div>
              <div className="my-1">{post.message}</div>
              {type === "comment" && (
                <button
                  onClick={() => {
                    setCurrentFocusReplyId(post.id);
                    setCurrentFocusEditId("");
                  }}
                  className="text-blue-500 mr-3"
                >
                  <b>Reply</b>
                </button>
              )}
              <button
                className="text-blue-500"
                onClick={() => {
                  setCurrentFocusEditId(post.id);
                  setCurrentFocusReplyId("");
                }}
              >
                <b>Edit</b>
              </button>
              <button
                className="text-blue-500 ml-3 absolute right-[-10px] top-0 bottom-0"
                onClick={() => handleOnDelete(post.id)}
              >
                <b>
                  <span>🗑️</span>
                </b>
              </button>
            </div>
            {currentFocusReplyId === post.id && (
              <div className="ml-16" ref={formRef}>
                <PostForm
                  headerText="Reply"
                  onSubmit={(e) => handleOnReplySubmit(e, post.id)}
                  onCancel={() => setCurrentFocusReplyId("")}
                  showCancel
                />
              </div>
            )}
            {currentFocusEditId === post.id && (
              <div
                className={classNames({
                  "ml-16": type === "reply",
                })}
                ref={formRef}
              >
                <PostForm
                  id={post.id}
                  headerText={"Edit " + type}
                  name={post.name}
                  message={post.message}
                  timestamp={post.timestamp}
                  isEdit={true}
                  onSubmit={(e) => handleOnEditSubmit(e, post.id)}
                  onCancel={() => setCurrentFocusEditId("")}
                  showCancel
                />
              </div>
            )}
            {post.replies && post.replies.length > 0 && (
              <Posts type="reply" data={post.replies} postId={post.id} />
            )}
          </div>
        );
      })}
    </div>
  );
}
