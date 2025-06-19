'use client';


import React, { useState } from 'react';

const Pvideo = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const pageSize = 5;

  const fetchVideos = async () => {
    if (!query.trim()) return;

    setLoading(true);
    const url = 'https://porn-xnxx-api.p.rapidapi.com/search';

    
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-key': '2457ba8e3emshe08a986aab8eeecp1680f3jsnffe826d5fd79',
        'x-rapidapi-host': 'porn-xnxx-api.p.rapidapi.com',
      },
      body: JSON.stringify({ q: query }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setVideos(data); // update depending on actual key
      setPage(0); // reset to first page
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if ((page + 1) * pageSize < videos.length) setPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const currentVideos = videos.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Paginated Videos</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movie type..."
          className="border border-gray-300 px-3 py-2 rounded w-full"
        />
        <button
          onClick={fetchVideos}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentVideos.map((video, index) => (
              <div key={index} className="bg-white rounded shadow p-4">
                <img
                  src={video.thumbnaila || `${video.poster_path}`}
                  alt={video.title}
                  className="w-full h-auto rounded"
                />
                <h2 className="text-lg font-semibold mt-2">{video.title}</h2>
                <p className="text-sm text-gray-600">
                  Duration: {video.duration || 'N/A'} • Views: {video.views || 'N/A'}
                </p>
                <a
                  href={video.video_link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  ▶ Watch Video
                </a>
              </div>
            ))}
          </div>

          {videos.length > 0 && (
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
          )}
        </>
      )}
    </div>
  );
};


export default Pvideo;
