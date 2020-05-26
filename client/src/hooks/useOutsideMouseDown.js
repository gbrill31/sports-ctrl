import { useEffect } from "react";

export default function useOutsideAlerter(ref, isEventOn, cb) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (isEventOn && ref.current && !ref.current.contains(event.target)) {
        if (cb) cb();
        return;
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb, isEventOn]);
}