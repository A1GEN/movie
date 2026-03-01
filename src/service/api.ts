import { API_BASE_URL, API_KEY } from '../constants';

export interface MovieResult {
  results: Array<{
    id: number;
    title: string;
    poster_path: string;
    overview?: string;
    release_date?: string;
  }>;
}

// структура для ответов с видео (трейлерами, клипами и т.п.)
export interface VideoResult {
  results: Array<{
    id: string;
    key: string;           // ключ YouTube (или другого сайта)
    name: string;
    site: string;          // например, "YouTube"
    type: string;          // "Trailer", "Teaser" и т.д.
  }>;
}

// popular movies
export async function getPopularMovies(): Promise<MovieResult> {
  const resp = await fetch(`${API_BASE_URL}movie/popular${API_KEY}`);
  return resp.json();
}

export async function getUpcomingMovies(): Promise<MovieResult> {
  const resp = await fetch(`${API_BASE_URL}movie/upcoming${API_KEY}`);
  return resp.json();
}

export async function searchMovies(query: string): Promise<MovieResult> {
  const resp = await fetch(`${API_BASE_URL}search/movie${API_KEY}&query=${encodeURIComponent(query)}`);
  return resp.json();
}

// получить видео (трейлеры/клипы) для конкретного фильма
export async function getMovieVideos(id: number): Promise<VideoResult> {
  const resp = await fetch(`${API_BASE_URL}movie/${id}/videos${API_KEY}`);
  return resp.json();
}
