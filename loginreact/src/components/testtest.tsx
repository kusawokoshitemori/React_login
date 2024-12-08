"use client";

import React, { forwardRef } from "react";

interface TestProps {
  postId: number;
}

// forwardRefの型指定を修正
const Test = forwardRef<HTMLDivElement, TestProps>(({ postId }, ref) => {
  return (
    <div ref={ref} className="test-component">
      <h2>Test Component</h2>
      <p>Post ID: {postId}</p>
    </div>
  );
});

Test.displayName = "Test";

export default Test;
