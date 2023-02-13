import { useEffect } from "react";

function useClickOutside(ref, fun) {
  useEffect(() => {
    const listener = (e) => {
      console.log(ref.current, e);
      if (!ref.current || ref.current.contains(e.target)) return;
      fun();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchStart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchStart", listener);
    };
  }, [ref]);
}

export { useClickOutside };
