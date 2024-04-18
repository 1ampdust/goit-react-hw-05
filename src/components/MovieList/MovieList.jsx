import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ items }) => {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {items.map(({ name, title, id }) => (
        <li className={css.movieCard} key={id}>
          <Link to={`/movies/${id}`} state={{ from: location }}>
            {
              <div>
                <h2 className={css.movieTitle}>{name || title}</h2>
              </div>
            }
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;