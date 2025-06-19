'use client';

import React, { useEffect, useState } from 'react';

const Pvideo = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(0); // Page index (0 = first 5, 1 = next 5, etc.)
  const [loading, setLoading] = useState(true);
  const pageSize = 5;

  useEffect(() => {
    const fetchVideos = async () => {
      const url = 'https://ai-movie-recommender.p.rapidapi.com/api/search?q=10s%20sad%20movies';

      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '2457ba8e3emshe08a986aab8eeecp1680f3jsnffe826d5fd79',
          'x-rapidapi-host': 'ai-movie-recommender.p.rapidapi.com',
        //   'Content-Type': 'application/json',
        }
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Network response not ok');
        const data = await response.json();
        setVideos(data.movies || []);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleNext = () => {
    if ((page + 1) * pageSize < videos.length) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const currentVideos = videos.slice(page * pageSize, (page + 1) * pageSize);

  console.log('Current Videos:', currentVideos);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Paginated Videos </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentVideos.map((video, index) => (
              <div key={index} className="bg-white rounded shadow p-4">
                <img
                  src={`https://image.tmdb.org/t/p/w300${video.poster_path}`}
                  alt={video.title}
                  className="w-full h-auto rounded"
                />
                <h2 className="text-lg font-semibold mt-2">{video.title}</h2>
                <p className="text-sm text-gray-600">
                  Duration: {video.title} • Views: {video.title}
                </p>
                <a
                  href={video.title}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  ▶ Watch Video
                </a>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handlePrevious}
              disabled={page === 0}
              className={`px-4 py-2 rounded ${
                page === 0 ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={(page + 1) * pageSize >= videos.length}
              className={`px-4 py-2 rounded ${
                (page + 1) * pageSize >= videos.length
                  ? 'bg-gray-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Pvideo;