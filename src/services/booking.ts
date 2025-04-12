/**
 * Represents a booking with its details.
 */
export interface Booking {
  /**
   * The movie ID for the booking.
   */
  movieId: string;
  /**
   * The selected showtime for the booking.
   */
  showtime: string;
  /**
   * The number of tickets for the booking.
   */
  numberOfTickets: number;
  /**
   * The total cost of the booking.
   */
  totalCost: number;
}

/**
 * Represents the availability and price information for a movie showtime.
 */
export interface Availability {
  /**
   * The number of tickets available for the showtime.
   */
  ticketsAvailable: number;
  /**
   * The price per ticket for the showtime.
   */
  pricePerTicket: number;
}

/**
 * Asynchronously retrieves the availability and price information for a given movie and showtime.
 *
 * @param movieId The ID of the movie.
 * @param showtime The selected showtime.
 * @returns A promise that resolves to an Availability object.
 */
export async function getAvailability(movieId: string, showtime: string): Promise<Availability> {
  // TODO: Implement this by calling an API.

  return {
    ticketsAvailable: 100,
    pricePerTicket: 12.5,
  };
}


/**
 * Asynchronously books tickets for a movie showtime.
 *
 * @param movieId The ID of the movie.
 * @param showtime The selected showtime.
 * @param numberOfTickets The number of tickets to book.
 * @returns A promise that resolves to a Booking object.
 */
export async function bookTickets(movieId: string, showtime: string, numberOfTickets: number): Promise<Booking> {
  // TODO: Implement this by calling an API.

  const { pricePerTicket } = await getAvailability(movieId, showtime);
  const totalCost = numberOfTickets * pricePerTicket;

  return {
    movieId,
    showtime,
    numberOfTickets,
    totalCost,
  };
}
