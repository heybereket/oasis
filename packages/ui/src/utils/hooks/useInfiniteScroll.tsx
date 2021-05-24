import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useInfiniteScroll(): (
  | boolean
  | Dispatch<SetStateAction<boolean>>
)[] {
  const [fetch, setFetch] = useState(false);
  useEffect(() => {
    function isScrolling() {
      console.log('Component is being scrolled');

      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      console.log('Fetch here');
      setFetch(true);
    }
    window.addEventListener('scroll', isScrolling);
    return () => window.removeEventListener('scroll', isScrolling);
  }, []);
  return [fetch, setFetch];
}
