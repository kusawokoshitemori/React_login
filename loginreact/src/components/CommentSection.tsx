"use client";

import Comment from "./Comment";
import CommentPost from "./CommentPost";

interface Comment {
  content: string; // コメントの内容
}

interface CommentsProps {
  comments: Comment[]; // コメントの配列
}

const CommentSection = ({ comments }: CommentsProps) => {
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
        <CommentPost />
      </div>
    </div>
  );
};

export default CommentSection;
