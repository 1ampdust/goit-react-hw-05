
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          params: {
            api_key: 'edfa30751428edbd8ca7d1b6854eb9a6'
          }
        });
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();

    return () => {
      setMovieDetails(null);
    };
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const { title, release_date, vote_average, overview, genres, poster_path } = movieDetails;

  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div>
      <h2>{title} ({release_date && release_date.substring(0, 4)})</h2>
      <img src={imageUrl} alt={title} />
      <p>User Score: {vote_average}</p>
      <p>Overview: {overview}</p>
      <p>Genres: {genres.map(genre => genre.name).join(', ')}</p>
    </div>
  );
};

export default MovieDetailsPage;
