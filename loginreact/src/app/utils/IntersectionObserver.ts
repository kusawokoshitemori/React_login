// utils/IntersectionObserver.ts
import { useEffect, RefObject } from "react";

const useIntersectionObserver = (
  refs: RefObject<HTMLElement>[],
  callback: () => void,
  threshold: number = 0.1
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            callback();
          }
        });
      },
      { threshold: [threshold] }
    );

    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [refs, callback, threshold]);
};

export default useIntersectionObserver;
