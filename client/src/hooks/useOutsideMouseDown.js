import { useEffect, useRef } from "react";

export default function useOutsideMouseDown(ref, isEventOn, cb) {
  const callbackRef = useRef(cb);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isEventOn &&
        !ref?.current?.contains(event.target) &&
        callbackRef.current
      ) {
        callbackRef.current();
        return;
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callbackRef, isEventOn]);
}
