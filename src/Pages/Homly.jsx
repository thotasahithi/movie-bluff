import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Components/SearchBar.jsx";
import NavBar from "../Components/NavBar.jsx";
import LoadingGif from "../assets/loadingGif.gif";
import { VscStarHalf } from "react-icons/vsc";
import Footer from "../Components/Footer.jsx";
import Trending from "../Components/Trending.jsx";
import useFetch from "../Hooks/useFetch.jsx";
import UpComingMovies from "../Components/UpComing.jsx";
import Trailers from "../Components/Trailers.jsx";

const URL = "https://api.themoviedb.org/3";

function Homly() {
  const [url, setUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: movies, loading, error } = useFetch(url);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const name = userName.toUpperCase();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setUserName(currentUser?.username || "Guest");
    }
  }, [navigate]);

  const handleSearch = (query) => {
    setSearchTerm(query);
    setUrl(`${URL}/search/movie?&query=${encodeURIComponent(query)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div>
      <NavBar />
      <h1 onClick={handleLogout}>
        Welcome, {name}!
      </h1>
      <div className="wrapper-search">
        <Search onSearch={handleSearch} />
        {loading && (
          <div className="loading-container">
            <img src={LoadingGif} alt="Loading..." width="200" />
          </div>
        )}
        {error && <p className="error-message">{error}</p>}

        {searchTerm && movies?.length > 0 && (
          <p className="results-info">
            {`Results for "${searchTerm}": ${movies.length}`}
          </p>
        )}
        {!searchTerm || movies?.length === 0 ? (
          <>
            <Trailers />
            <Trending />
            <UpComingMovies />
          </>
        ) : null}

        {movies?.length > 0 && (
          <div className="movie-grid">
            {movies.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <h2>{movie.title}</h2>
                <p>{movie.release_date?.split("-")[0]}</p>
                <p>Language: {movie.original_language.toUpperCase()}</p>
                <p>
                  <VscStarHalf /> {movie.vote_average.toFixed(1)}
                </p>
                {movie.poster_path ? (
                  <Link to={`/plot?id=${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      className="movie-poster"
                    />
                  </Link>
                ) : (
                  <p>No Poster Available</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Display detailed info when only one movie is found */}
        {movies?.length === 1 && searchTerm && (
          <div className="single-movie-info" style ={{ marginTop: "20px", padding: "20px", backgroundColor: "#f8f8f8", borderRadius: "10px" }}>
            <p>Language: {movies[0].original_language.toUpperCase()}</p>
            <p>Release Date: {movies[0].release_date}</p>
            <p>Rating: {movies[0].vote_average.toFixed(1)}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movies[0].poster_path}`}
              alt={movies[0].title}
              className="movie-poster"
            />
            <p>Vote Count: {movies[0].vote_count}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>  
  );
}

export default Homly;
