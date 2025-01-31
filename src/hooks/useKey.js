import { useEffect } from "react";

export const useKey = (key, action) => {
  useEffect(() => {
    const callBack = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action(null);
      }
    };

    document.addEventListener("keydown", callBack);

    return () => {
      document.removeEventListener("keydown", callBack);
    };
  }, [key, action]);
};
