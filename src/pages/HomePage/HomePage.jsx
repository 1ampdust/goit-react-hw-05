import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const api_key = 'edfa30751428edbd8ca7d1b6854eb9a6';
  const access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGZhMzA3NTE0MjhlZGJkOGNhN2QxYjY4NTRlYjlhNiIsInN1YiI6IjY2MjA0MWJkOWFmMTcxMDE3ZTc5Y2RlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PGEKy9Rqd631ibY5gqNMRyxx2b3pSkgxxLcklsfnoBE';

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
