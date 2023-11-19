import { CommonProps, PostProps } from "../types";

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
  const { type, data, postId } = props;
  return (
    <div className="px-4 py-2 max-w-[600px] m-auto flex flex-col border border-[#EFEFEF] rounded-sm">
      {data.map((post) => {
        return (
          <>
            <div key={post.id}>
              <div>{post.name}</div>
              <div>{post.message}</div>
              <div>{post.timestamp}</div>
            </div>
            {post.replies && post.replies.length > 0 && (
              <Posts type="reply" data={post.replies} postId={post.id} />
            )}
          </>
        );
      })}
    </div>
  );
}
