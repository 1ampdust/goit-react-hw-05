import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMoviesBySearch } from "../../api/api";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [loading, setLoading] = useState(false);
  const [movieItems, setMovieItems] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (query) => {
    if (!query) {
      return;
    }
    setSearchParams({ search: query });
  };

  useEffect(() => {
    const value = searchParams.get("search");
    if (!value) return;

    async function getSearchMovies() {
      try {
        setLoading(true);
        const searchMovies = await fetchMoviesBySearch(value);
        setMovieItems(searchMovies);
      } catch (error) {
        return { error: "Oops! Something went wrong! Please reload the page!" };
      } finally {
        setLoading(false);
      }
    }
    getSearchMovies();
  }, [searchParams]);

  return (
    <div className={css.moviesPage}>
      <SearchBar onSubmit={handleSubmit} />
      
      {loading && <Loader />}
      {searchParams && <MovieList items={movieItems} />}
    </div>
  );
};

export default MoviesPage;
