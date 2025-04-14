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
      posterUrl: 'Oppenheimer.jpg',
      showtimes: ['14:00', '16:30', '19:00'],
      genre: 'Biographical Drama',
      category: 'blockbuster',
    },
    {
      id: '2',
      title: 'Barbie',
      posterUrl: 'Barbie.jpg',
      showtimes: ['15:00', '17:30', '20:00'],
      genre: 'Comedy',
      category: 'blockbuster',
    },
    {
      id: '3',
      title: 'The Shawshank Redemption',
      posterUrl: 'TheShawshankRedemption.jpg',
      showtimes: ['13:00', '15:30', '18:00'],
      genre: 'Drama',
      category: 'available',
    },
    {
      id: '4',
      title: 'The Dark Knight',
      posterUrl: 'TheDarkKnight.jpg',
      showtimes: ['16:00', '18:30', '21:00'],
      genre: 'Action',
      category: 'available',
    },
    {
      id: '5',
      title: 'Pulp Fiction',
      posterUrl: 'PulpFiction.jpg',
      showtimes: ['14:30', '17:00', '19:30'],
      genre: 'Crime',
      category: 'available',
    },
    {
      id: '6',
      title: 'Forrest Gump',
      posterUrl: 'ForrestGump.jpg',
      showtimes: ['15:30', '18:00', '20:30'],
      genre: 'Drama',
      category: 'available',
    },
    {
      id: '7',
      title: 'Inception',
      posterUrl: 'Inception.jpg',
      showtimes: ['13:30', '16:00', '18:30'],
      genre: 'Sci-Fi',
      category: 'available',
    },
    {
      id: '8',
      title: 'The Matrix',
      posterUrl: 'TheMatrix.jpg',
      showtimes: ['17:00', '19:30', '22:00'],
      genre: 'Sci-Fi',
      category: 'available',
    },
    {
      id: '9',
      title: 'Goodfellas',
      posterUrl: 'Goodfellas.jpg',
      showtimes: ['16:30', '19:00', '21:30'],
      genre: 'Crime',
      category: 'available',
    },
    {
      id: '10',
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      posterUrl: 'TheLordOfTheRingsTheFellowshipOfTheRing.jpg',
      showtimes: ['14:00', '17:30', '21:00'],
      genre: 'Fantasy',
      category: 'available',
    },
    {
      id: '11',
      title: 'Interstellar',
      posterUrl: 'Interstellar.jpg',
      showtimes: ['13:00', '16:30', '20:00'],
      genre: 'Sci-Fi',
      category: 'available',
    },
    {
      id: '12',
      title: 'Parasite',
      posterUrl: 'Parasite.jpg',
      showtimes: ['15:00', '18:30', '22:00'],
      genre: 'Thriller',
      category: 'available',
    },
    {
      id: '13',
      title: 'Avatar 2',
      posterUrl: 'Avatar2.jpg',
      showtimes: ['15:00', '18:30', '22:00'],
       genre: 'Action, Sci-Fi, Adventure',
      category: 'coming',
    },
    {
      id: '14',
      title: 'Mission Impossible 8',
      posterUrl: 'MissionImpossible8.jpg',
      showtimes: ['15:00', '18:30', '22:00'],
      genre: 'Action, Thriller, Adventure',
      category: 'coming',
    },
    {
      id: '15',
      title: 'Oppenheimer',
      posterUrl: 'Oppenheimer.jpg',
      showtimes: ['14:00', '16:30', '19:00'],
      genre: 'Historical Drama',
      category: 'available',
    },
    {
      id: '16',
      title: 'Inception',
      posterUrl: 'Inception.jpg',
      showtimes: ['13:30', '16:00', '18:30'],
      genre: 'Sci-Fi Action',
      category: 'available',
    },
  ];
}
