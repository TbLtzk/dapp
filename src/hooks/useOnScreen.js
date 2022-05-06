import { useEffect, useState } from 'react';

export default function useOnScreen (ref) {
  const [isIntersecting, setIsIntersecting] = useState(true);

  const observer = new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting));

  useEffect(() => {
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}
