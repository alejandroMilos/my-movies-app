"use client";

import { useEffect, useState } from "react";
import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";

export default function Home() {
  const [nowPlaying, setNowPlaying] = useState<any[]>([]);
  const [popular, setPopular] = useState<any[]>([]);
  const [topRated, setTopRated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [now, pop, top] = await Promise.all([
          getNowPlayingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
        ]);
        setNowPlaying(now.results.slice(0, 4));
        setPopular(pop.results.slice(0, 4));
        setTopRated(top.results.slice(0, 4));
      } catch (e) {
        // Manejo de error opcional
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading) return <div className="text-center py-10">Cargando...</div>;

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Mis Películas</h1>

      <Section title="Now Playing" movies={nowPlaying} href="/now-playing" />
      <Section title="Popular" movies={popular} href="/popular" />
      <Section title="Top Rated" movies={topRated} href="/movie/top-rated" />
    </div>
  );
}

function Section({
  title,
  movies,
  href,
}: {
  title: string;
  movies: any[];
  href: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link href={href} className="text-red-600 hover:underline text-sm">
          Ver todas
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
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
}
