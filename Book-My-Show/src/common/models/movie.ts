// src/models/movie.ts

interface Movie {
  movieId: string;
  name: string;
  languages: string[]; // List of languages
  duration: number;
  genre: string;
  rating: string; // Age rating (U, UA, A)
  features: string[]; // e.g., 2D, 3D, IMAX, Dolby
  cast?: string[]; // optional
}

class MovieModel implements Movie {
  movieId: string;
  name: string;
  languages: string[];
  duration: number;
  genre: string;
  rating: string;
  features: string[];
  cast?: string[];

  constructor(
    movieId: string,
    name: string,
    languages: string[],
    duration: number,
    genre: string,
    rating: string,
    features: string[],
    cast?: string[]
  ) {
    this.movieId = movieId;
    this.name = name;
    this.languages = languages;
    this.duration = duration;
    this.genre = genre;
    this.rating = rating;
    this.features = features;
    this.cast = cast;
  }
}

export { Movie, MovieModel };
