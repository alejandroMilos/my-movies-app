"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { getMovieById } from "@/services/movies/getMovieById";
import { useFavorites } from "@/hooks/useFavorites";
import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
//import MoviesCarousel from "@/components/MoviesCarousel";

const MovieDetailPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const [movie, setMovie] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isFav = id && typeof id === "string" ? isFavorite(id) : false;
  const [topRated, setTopRated] = useState<any[]>([]);

  useEffect(() => {
    if (!id || typeof id !== "string") return;
    const fetchTopRatedMovies = async () => {
      try {
        const data = await getTopRatedMovies();
        setTopRated(data.results);
      } catch (err) {
        setError("Could not load top rated movies.");
      }
    };
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        setError("Could not load movie.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
    fetchTopRatedMovies();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-10 text-lg">Cargando película...</div>
    );
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!movie) return <div className="text-center">No movie found.</div>;

  return (
    <div>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-8 flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-72 h-auto rounded-lg object-cover shadow-md"
        />
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl text-gray-600 font-bold">{movie.title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span className="font-semibold">
              {movie.release_date?.substring(0, 4)}
            </span>
            <span>⭐ {movie.vote_average?.toFixed(1)}</span>
            <span>{movie.runtime} min</span>
          </div>
          <p className="text-gray-700">{movie.overview}</p>
          {movie.genres && (
            <div className="flex flex-wrap gap-2 mt-2">
              {movie.genres.map((genre: any) => (
                <span
                  key={genre.id}
                  className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}
          {from && (
            <div className="mt-4">
              <span className="text-xs text-gray-400">
                Navegaste desde: <b>{from}</b>
              </span>
            </div>
          )}
          <button
            className={`px-4 py-2 rounded font-semibold transition-transform duration-200 ease-out transform ${
              isFav ? "bg-red-500 text-white hover:bg-red-600 active:scale-95" : "bg-gray-200 text-gray-800 hover:bg-gray-300 active:scale-95 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => {
              if (!id || typeof id !== "string") return;
              isFav ? removeFavorite(id) : addFavorite(id);
            }}
          >
            {isFav ? "Quitar de Favoritos" : "Agregar a Favoritos"}
          </button>
        </div>
      </div>
      {/* Carrusel de películas Top Rated */}
      {topRated.length > 0 && (
        <section className="max-w-full mx-auto bg-[var(--card)] rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
            Top Rated
          </h2>

          {/* Contenedor scrollable con snap */}
          <div
            className="
              flex space-x-4 
              overflow-x-auto overflow-y-hidden
              scroll-pl-6
              snap-x snap-mandatory
              no-scrollbar
            "
          >
            {topRated.slice(0, 8).map((movie) => (
              <a
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="
                  min-w-[150px]
                  bg-[var(--card)] text-[var(--foreground)]
                  rounded-lg overflow-hidden shadow
                  transform transition-transform duration-300 ease-out
                  hover:scale-105 active:scale-95
                  snap-start
                "
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-2">
                  <h4 className="text-sm font-semibold truncate">
                    {movie.title}
                  </h4>
                  <span className="text-xs text-[var(--secondary-foreground)]">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MovieDetailPage;
