import { useState, useEffect, RefObject } from 'react';
interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}
export const useIntersectionObserver = (ref: RefObject<Element>, options: IntersectionObserverOptions = {}): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0,
    triggerOnce = false
  } = options;
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      // If element has been intersected and triggerOnce is true, unobserve it
      if (entry.isIntersecting && triggerOnce && ref.current) {
        observer.unobserve(ref.current);
      }
    }, {
      root,
      rootMargin,
      threshold
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, root, rootMargin, threshold, triggerOnce]);
  return isIntersecting;
};