import css from "./MovieInfo.module.css";
import noinfo from "./noinfo.jpg";

const MovieDetals = ({
  movie: { poster_path, title, release_date, vote_average, overview, genres },
}) => {
  const defaultImage =
    noinfo;

  return (
    <div className={css.detalsPage}>
      <img
        className={css.posterImage}
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : defaultImage
        }
        alt={title}
        width={350}
      />
      <div className={css.detalsInfo}>
        <h2 className={css.detalsTitle}>{`${title} (${
          release_date.split("-")[0]
        })`}</h2>
        <p className={css.detalsText}>{`User score: ${Math.round(
          vote_average * 10
        )}%`}</p>
        <h3 className={css.detalsOverview}>Overview</h3>
        <p className={css.detalsText}>{overview}</p>
        {genres && genres.length > 0 && (
          <>
            <h4 className={css.detalsGenres}>Genres</h4>
            <p className={css.detalsText}>
              {genres.map((genre, idx) => (
                <span className={css.genre} key={idx}>
                  {genre.name} {idx < genres.length - 1 && ", "}
                </span>
              ))}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetals;