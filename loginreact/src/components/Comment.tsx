"use client";

interface CommentProps {
  content: string; // コメントの内容
}

const Comment = ({ content }: CommentProps) => {
  return (
    <div className="w-2/3 m-auto border-4 border-green-700 rounded-md my-2">
      <p className="text-base">{content}</p>
    </div>
  );
};

export default Comment;
