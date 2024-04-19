import css from "./MovieReviews.module.css";
import { fetchMovieReviews } from "../../api/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const { movieId } = useParams();

  const [reviewsMovie, setReviewMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function getReviews() {
      try {
        setLoading(true);
        const fetchedReviews = await fetchMovieReviews(movieId);
        setReviewMovie(fetchedReviews);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getReviews();
  }, [movieId]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!loading) {
      scrollToTop();
    }
  }, [loading]);

  return (
    <div>
      {loading && <Loader />}
      {error && (
        <p className={css.errorMessage}>
          Oops! Something went wrong! Please reload the page!
        </p>
      )}

      <Link to={`/movies/${movieId}`} className={css.goBackBtn}>
  ←
</Link>


      {reviewsMovie.length > 0 ? (
        <ul>
          {reviewsMovie.map((review) => (
            <li className={css.reviewInfo} key={review.id}>
              <h2 className={css.reviewAuthor}>Author: {review.author}</h2>
              <p className={css.reviewText}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.errorMessage}>
          We don&apos;t have any information about the actors.
        </p>
      )}
    </div>
  );
};

export default MovieReviews;
