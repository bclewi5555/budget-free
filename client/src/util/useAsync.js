// https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component

import { useEffect } from "react";

// use async operation with automatic abortion on unmount
export default function useAsync(asyncFn, onSuccess) { // async functions defined outside of sync useEffect hook
  useEffect(() => {
    let isMounted = true;
    asyncFn().then(data => {
      if (isMounted) onSuccess(data);
    });
    return () => { // on effect cleanup
      isMounted = false;
    };
  }, [asyncFn, onSuccess]); // react-hooks required dependency array
}