import { useEffect, useRef } from "react";

export const Search = ({ query, setQuery }) => {
  const inpuEl = useRef(null);
  // console.log(inpuEl.current);

  useEffect(() => {
    const callback = (e) => {
      // console.log(e);
      // console.log(document.activeElement, "-------------");
      if (document.activeElement === inpuEl.current) return;
      if (e.code === "Enter") inpuEl.current.focus();
      setQuery("");
    };

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inpuEl}
    />
  );
};
