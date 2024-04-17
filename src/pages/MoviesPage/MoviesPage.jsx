import { Formik, Form, Field } from 'formik';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const searchMovies = async (query) => {
    try {
      const apiKey = 'edfa30751428edbd8ca7d1b6854eb9a6';
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          query: query,
          api_key: apiKey,
          language: 'en-US',
          page: 1
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  };

  const handleSubmit = async (values, actions) => {
    const formattedSearch = values.search.trim().toLowerCase();
    if (formattedSearch !== '') {
      try {
        const movies = await searchMovies(formattedSearch);
        setSearchResults(movies);
      } catch (error) {
        console.error('Error fetching movies:', error);
        toast.error('Error fetching movies');
      }
      actions.resetForm();
    } else {
      toast.error('Enter your search term!');
    }
  };
  
  return (
    <div>
      <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
        <Form>
          <Field
            type="text"
            autoComplete="off"
            autoFocus
            name="search"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      {searchResults.length > 0 && (
        <div>
      <h1>Search results:</h1>
      <ul>
        {searchResults.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
      )}
    </div>
  );
};

export default MoviesPage;
