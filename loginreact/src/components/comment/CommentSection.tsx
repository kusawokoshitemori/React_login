"use client";

import Comment from "./Comment";
import CommentPost from "./CommentPost";

interface Comment {
  content: string; // コメントの内容
}

interface CommentsProps {
  comments: Comment[]; // コメントの配列
  setComments: React.Dispatch<React.SetStateAction<{ content: string }[]>>;
  postId: number;
  setCommentNumber: React.Dispatch<React.SetStateAction<number>>;
}

const CommentSection = ({
  comments,
  setComments,
  postId,
  setCommentNumber,
}: CommentsProps) => {
  return (
    <div>
      <div>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Comment key={index} content={comment.content} />
          ))
        ) : (
          <p>コメントはありません</p>
        )}
      </div>
      <div>
        <CommentPost
          postId={postId}
          setCommentNumber={setCommentNumber}
          setComments={setComments}
        />
      </div>
    </div>
  );
};

export default CommentSection;
