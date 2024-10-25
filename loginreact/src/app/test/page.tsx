"use client";

import React, { useEffect, useRef } from "react";

const TestComponent = () => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            console.log("要素が10%表示されました！"); // ログを出力
          }
        });
      },
      {
        threshold: [0.1],
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return <div ref={elementRef}>この要素が10%表示されたらログが出ます。</div>;
};

const ParentComponent = () => {
  return (
    <div>
      <h1>スクロールして要素を見つけてください。</h1>
      <TestComponent />
      <div>もっと下にスクロールしてください。</div>
    </div>
  );
};

export default ParentComponent;
