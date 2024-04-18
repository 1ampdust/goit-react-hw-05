import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const API_KEY = 'edfa30751428edbd8ca7d1b6854eb9a6';
const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGZhMzA3NTE0MjhlZGJkOGNhN2QxYjY4NTRlYjlhNiIsInN1YiI6IjY2MjA0MWJkOWFmMTcxMDE3ZTc5Y2RlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PGEKy9Rqd631ibY5gqNMRyxx2b3pSkgxxLcklsfnoBE";

export const fetchTrendingList = async () => {
  const response = await axios.get(`/trending/all/day`, {
    params: { api_key: API_KEY },
    headers: { Authorization: token }
  });
  const { results } = response.data;
  return results;
};

export const fetchMoviesBySearch = async (query) => {
  const response = await axios.get(`/search/movie`, {
    params: { query, api_key: API_KEY },
    headers: { Authorization: token }
  });
  const { results } = response.data;
  return results;
};

export const fetchMovieById = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}`, {
      params: { api_key: API_KEY },
      headers: { Authorization: token }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { error: "Oops! Movie not found" };
    } else {
      return { error: "Oops! Something went wrong! Please reload the page!" };
    }
  }
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, {
    params: { api_key: API_KEY },
    headers: { Authorization: token }
  });
  const { cast } = response.data;
  return cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, {
    params: { api_key: API_KEY },
    headers: { Authorization: token }
  });
  const { results } = response.data;
  return results;
};
