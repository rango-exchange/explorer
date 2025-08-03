import { useEffect, useState, RefObject } from 'react';

function useIsTruncated(ref: RefObject<HTMLElement>): boolean {
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(() => {
      setIsTruncated(element.scrollWidth > element.clientWidth);
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return isTruncated;
}

export default useIsTruncated;
