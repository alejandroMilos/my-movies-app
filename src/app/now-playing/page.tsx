"use client";

import React, { useEffect, useState } from "react";
import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";

const NowPlayingMovies = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      try {
        const data = await getNowPlayingMovies();
        setMovies(data.results);
      } catch (err) {
        console.error("Error loading top rated movies: ", err);
      }
      setLoading(false);
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Now Playing</h2>
      {loading && <h5 className="text-lg text-gray-500">Cargando...</h5>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies?.map((movie) => (
          <Link
            key={movie.id}
            href={{
              pathname: `/movie/${movie.id}`,
              query: { from: "top-rated" },
            }}
            className="hover:scale-105 transition-transform"
          >
            <MovieCard
              title={movie.title}
              voteAverage={movie.vote_average}
              posterPath={movie.poster_path}
              releaseYear={parseInt(movie.release_date?.substring(0, 4) || "0")}
              description={movie.overview}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NowPlayingMovies;
