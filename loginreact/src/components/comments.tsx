"use client";

interface Comment {
  content: string; // コメントの内容
}

interface CommentsProps {
  comments: Comment[]; // コメントの配列
}

const Comments = ({ comments }: CommentsProps) => {
  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment, index) => <p key={index}>{comment.content}</p>)
      ) : (
        <p>コメントはありません</p>
      )}
    </div>
  );
};

export default Comments;
