'use client';

import React, { useEffect, useState } from 'react';

const MovieRecommender = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const url =
        'https://ai-movie-recommender.p.rapidapi.com/api/search?q=10s%20sad%20movies';

      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '2457ba8e3emshe08a986aab8eeecp1680f3jsnffe826d5fd79',
          'x-rapidapi-host': 'ai-movie-recommender.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Network response not ok');
        const data = await response.json();
        setMovies(data.movies || []);
      } catch (err) {
        setError(err.message || 'Error fetching movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Sad Movie Recommendations</h1>

      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {movies.map((movie) => (
            <div key={movie.id} className="border rounded shadow p-4 flex flex-col">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="mb-4 rounded"
              />
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-sm text-gray-600 mb-2">Release: {movie.release_date}</p>
              <p className="flex-grow text-sm">{movie.overview}</p>
              <p className="mt-2 text-sm font-medium">
                Rating: {movie.vote_average} ({movie.vote_count} votes)
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieRecommender;
