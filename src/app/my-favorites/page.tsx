"use client";
import { useFavorites } from "@/hooks/useFavorites";
import { useEffect, useState } from "react";
import { getMovieById } from "@/services/movies/getMovieById";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const results = await Promise.all(
        favorites.map((id) => getMovieById(id))
      );
      setMovies(results);
      setLoading(false);
    };
    if (favorites.length > 0) fetchFavorites();
    else setMovies([]);
  }, [favorites]);

  if (loading) return <div>Cargando favoritos...</div>;
  if (favorites.length === 0) return <div>No tienes favoritos.</div>;

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">My Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
