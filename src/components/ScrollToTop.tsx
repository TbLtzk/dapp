import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// HACK: to scroll top page
export default function ScrollToTop () {
  const { pathname } = useLocation();

  useEffect(() => {
    document.querySelector('.app__main')?.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
