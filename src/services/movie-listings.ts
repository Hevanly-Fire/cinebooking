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
  /**
   * The genre of the movie
   */
  genre: string;

  /**
   * The category of the movie
   */
  category: string;
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
      title: 'Oppenheimer',
      posterUrl: 'https://picsum.photos/400/600',
      showtimes: ['14:00', '16:30', '19:00'],
      genre: 'Biographical Drama',
      category: 'blockbuster',
    },
    {
      id: '2',
      title: 'Barbie',
      posterUrl: 'https://picsum.photos/401/600',
      showtimes: ['15:00', '17:30', '20:00'],
      genre: 'Comedy',
      category: 'blockbuster',
    },
    {
      id: '3',
      title: 'The Shawshank Redemption',
      posterUrl: 'https://picsum.photos/402/600',
      showtimes: ['13:00', '15:30', '18:00'],
      genre: 'Drama',
      category: 'available',
    },
    {
      id: '4',
      title: 'The Dark Knight',
      posterUrl: 'https://picsum.photos/403/600',
      showtimes: ['16:00', '18:30', '21:00'],
      genre: 'Action',
      category: 'available',
    },
    {
      id: '5',
      title: 'Pulp Fiction',
      posterUrl: 'https://picsum.photos/404/600',
      showtimes: ['14:30', '17:00', '19:30'],
      genre: 'Crime',
      category: 'available',
    },
    {
      id: '6',
      title: 'Forrest Gump',
      posterUrl: 'https://picsum.photos/405/600',
      showtimes: ['15:30', '18:00', '20:30'],
      genre: 'Drama',
      category: 'available',
    },
    {
      id: '7',
      title: 'Inception',
      posterUrl: 'https://picsum.photos/406/600',
      showtimes: ['13:30', '16:00', '18:30'],
      genre: 'Sci-Fi',
      category: 'available',
    },
    {
      id: '8',
      title: 'The Matrix',
      posterUrl: 'https://picsum.photos/407/600',
      showtimes: ['17:00', '19:30', '22:00'],
      genre: 'Sci-Fi',
      category: 'available',
    },
    {
      id: '9',
      title: 'Goodfellas',
      posterUrl: 'https://picsum.photos/408/600',
      showtimes: ['16:30', '19:00', '21:30'],
      genre: 'Crime',
      category: 'available',
    },
    {
      id: '10',
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      posterUrl: 'https://picsum.photos/409/600',
      showtimes: ['14:00', '17:30', '21:00'],
      genre: 'Fantasy',
      category: 'available',
    },
    {
      id: '11',
      title: 'Interstellar',
      posterUrl: 'https://picsum.photos/410/600',
      showtimes: ['13:00', '16:30', '20:00'],
      genre: 'Sci-Fi',
      category: 'available',
    },
    {
      id: '12',
      title: 'Parasite',
      posterUrl: 'https://picsum.photos/411/600',
      showtimes: ['15:00', '18:30', '22:00'],
      genre: 'Thriller',
      category: 'available',
    },
    {
      id: '13',
      title: 'Avatar 2',
      posterUrl: 'https://picsum.photos/412/600',
      showtimes: ['15:00', '18:30', '22:00'],
      genre: 'Sci-Fi',
      category: 'coming',
    },
    {
      id: '14',
      title: 'Mission Impossible 8',
      posterUrl: 'https://picsum.photos/413/600',
      showtimes: ['15:00', '18:30', '22:00'],
      genre: 'Thriller',
      category: 'coming',
    },
  ];
}
