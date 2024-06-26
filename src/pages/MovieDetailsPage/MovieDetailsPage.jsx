import css from "./MovieDetailsPage.module.css";
import { fetchMovieById } from "../../api/api";
import Loader from "../../components/Loader/Loader";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import clsx from "clsx";

const MovieDetailsPage = () => {
  const linkActive = ({ isActive }) => {
    return clsx(css.castReviewBtn, isActive && css.active);
  };
  const { movieId } = useParams();

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/");

  useEffect(() => {
    if (!movieId) return;
    async function getMovie() {
      try {
        setLoading(true);
        const fetchedMovie = await fetchMovieById(movieId);
        if (fetchedMovie.error) {
          setError(fetchedMovie.error);
        } else {
          setSelectedMovie(fetchedMovie);
        }
      } catch (error) {
        setError("Oops! Something went wrong! Please reload the page!");
      } finally {
        setLoading(false);
      }
    }

    getMovie();
  }, [movieId]);

  return (
    <div className={css.detailPage}>
      {loading && <Loader />}
      <Link to={backLinkRef.current} className={css.backBtn}>
        Go back
      </Link>
      {selectedMovie && <MovieInfo movie={selectedMovie} />}
      {error && <p className={css.errorMessage}>{error}</p>}
      <div className={css.detailList}>
        <h2>Additional information:</h2>
        <NavLink to="cast" className={css.linkActive || linkActive}>
          Cast
        </NavLink>

        <NavLink to="reviews" className={css.linkActive || linkActive}>
          Reviews
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
