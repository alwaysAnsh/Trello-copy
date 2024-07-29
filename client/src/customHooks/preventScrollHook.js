import { useEffect } from 'react';

const usePreventWindowScrollOnDrag = () => {
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();

    window.addEventListener('wheel', preventDefault, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventDefault);
    };
  }, []);
};

export default usePreventWindowScrollOnDrag;
