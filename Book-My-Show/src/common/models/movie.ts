// From Note 4: Movie class
interface Movie {
  movieId: string;
  title: string;
  genre: string;
  duration: number; // in minutes
  language: string;
  rating: number;
  features: string[]; // e.g., 2D, 3D, IMAX, Dolby
  cast?: string[]; // optional
}

class MovieModel implements Movie {
  movieId: string;
  title: string;
  genre: string;
  duration: number;
  language: string;
  rating: number;
  features: string[];
  cast?: string[];

  constructor(
    movieId: string,
    title: string,
    genre: string,
    duration: number,
    language: string,
    rating: number,
    features: string[],
    cast?: string[]
  ) {
    this.movieId = movieId;
    this.title = title;
    this.genre = genre;
    this.duration = duration;
    this.language = language;
    this.rating = rating;
    this.features = features;
    this.cast = cast;
  }
}

export { Movie, MovieModel };
