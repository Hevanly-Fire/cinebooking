/**
 * Represents a movie listing with its details.
 */
export interface Movie {
  /**
   * The unique identifier of the movie.
   */
  id: string;
  /**
   * The title of the movie.
   */
  title: string;
  /**
   * The URL of the movie poster.
   */
  posterUrl: string;
  /**
   * The available showtimes for the movie.
   */
  showtimes: string[];
}

/**
 * Asynchronously retrieves a list of available movies.
 *
 * @returns A promise that resolves to an array of Movie objects.
 */
export async function getMovies(): Promise<Movie[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      id: '1',
      title: 'Movie 1',
      posterUrl: 'https://picsum.photos/400/600',
      showtimes: ['14:00', '16:30', '19:00'],
    },
    {
      id: '2',
      title: 'Movie 2',
      posterUrl: 'https://picsum.photos/401/600',
      showtimes: ['15:00', '17:30', '20:00'],
    },
  ];
}
