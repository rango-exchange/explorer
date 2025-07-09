import { useEffect, useState, RefObject } from 'react';

function useIsTruncated(ref: RefObject<HTMLElement>): boolean {
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const checkOverflow = () => {
      setIsTruncated(element.scrollWidth > element.clientWidth);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [ref]);

  return isTruncated;
}

export default useIsTruncated;
