import { useState, useEffect } from 'react';
import { fetchTrendingList } from '../../api/api';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movieItems, setMovieItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getTrendingList() {
      try {
        setLoading(true);
        setError(false);

        const initialMovies = await fetchTrendingList();
        setMovieItems(initialMovies);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getTrendingList();
  }, []);

  return (
    <div className={css.trendingsPage}>
      <h1 className={css.trendings}>Trending Today:</h1>
      {loading && <Loader />}
      {error && (
        <h2>
          Oops! Something went wrong! Please reload the page!
        </h2>
      )}
      {movieItems.length > 0 && <MovieList items={movieItems} />}
    </div>
  );
};

export default HomePage;
