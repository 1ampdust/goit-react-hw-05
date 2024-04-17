import HomePage from './pages/HomePage/HomePage.jsx'
import { Suspense } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import MoviesPage from './pages/MoviesPage/MoviesPage.jsx'
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage.jsx';
import MovieCast from './components/MovieCast/MovieCast.jsx'

const App = () => {
  return (
    <div>
      <header>
        <nav>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/movies"}>Movies</NavLink>
        </nav>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
            <Route path="/movies/:movieId/cast" element={<MovieCast />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App