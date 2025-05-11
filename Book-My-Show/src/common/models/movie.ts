import { BaseModel } from './baseModel';
import { Language } from './language';

interface Movie extends BaseModel {
  title: string; // Changed from name to title
  languages: Language[]; // Changed from string[] to Language[]
  duration: number;
  genre: string;
  rating: string;
  features: string[];
  cast?: string[];
}

class MovieModel implements Movie {
  id: string;
  title: string;
  languages: Language[];
  duration: number;
  genre: string;
  rating: string;
  features: string[];
  cast?: string[];

  constructor(
    id: string,
    title: string,
    languages: Language[],
    duration: number,
    genre: string,
    rating: string,
    features: string[],
    cast?: string[]
  ) {
    this.id = id;
    this.title = title;
    this.languages = languages;
    this.duration = duration;
    this.genre = genre;
    this.rating = rating;
    this.features = features;
    this.cast = cast;
  }
}

export { Movie, MovieModel };
