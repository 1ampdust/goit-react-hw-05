import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
 
  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/trending/movie/day';
    const options = {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      params: {
        api_key
      }
    };

    axios.get(url, options)
      .then(response => {
        setTrendingMovies(response.data.results);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Trending Today</h1>
      <ul>
        {trendingMovies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
