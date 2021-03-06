import { useLayoutEffect, useMemo, useRef } from 'react';

const useEventCallback = (fn) => {
  let ref = useRef(fn);
  useLayoutEffect(() => {

    ref.current = fn;
  });

  return useMemo(() => (...args) => {
    const { current } = ref;
    return current(...args);
  }, []);
};

export default useEventCallback;
