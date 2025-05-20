import MovieCard from "./MovieCard";
import Link from "next/link";

export default function MoviesCarousel({
  movies,
  title,
}: {
  movies: any[];
  title: string;
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  if (!movies?.length) return null;

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="px-2">
            <Link href={`/movie/${movie.id}`}>
              <MovieCard
                title={movie.title}
                voteAverage={movie.vote_average}
                posterPath={movie.poster_path}
                releaseYear={parseInt(
                  movie.release_date?.substring(0, 4) || "0"
                )}
                description={movie.overview}
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
