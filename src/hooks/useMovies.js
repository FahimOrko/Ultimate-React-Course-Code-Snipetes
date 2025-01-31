import { useEffect, useState } from "react";

export const useMovies = (fetchLink, query, setSelectedId) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(fetchLink + query, {
          signal: controller.signal,
        });

        if (!res.ok)
          throw new Error(
            "Something went wrong, Check your internet connecting or reload the page"
          );

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setError("");
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    setSelectedId(null);
    fetchMovies();
    return () => {
      controller.abort();
    };
  }, [query, fetchLink, setSelectedId]);

  return { movies, isLoading, error };
};
