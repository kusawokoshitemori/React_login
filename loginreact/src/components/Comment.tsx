"use client";

interface CommentProps {
  content: string; // コメントの内容
}

const Comment = ({ content }: CommentProps) => {
  return <p>{content}</p>;
};

export default Comment;
