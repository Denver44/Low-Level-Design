// src/models/movie.ts
import { BaseModel } from './baseModel';
import { Language } from './language';

interface Movie extends BaseModel {
  name: string;
  languages: Language[]; // Updated to use Language enum
  duration: number;
  genre: string;
  rating: string; // Age rating (U, UA, A)
  features: string[]; // e.g., 2D, 3D, IMAX, Dolby
  cast?: string[]; // optional
}

class MovieModel implements Movie {
  id: string;
  name: string;
  languages: Language[];
  duration: number;
  genre: string;
  rating: string;
  features: string[];
  cast?: string[];
  constructor(
    id: string,
    name: string,
    languages: Language[],
    duration: number,
    genre: string,
    rating: string,
    features: string[],
    cast?: string[]
  ) {
    this.id = id;
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
