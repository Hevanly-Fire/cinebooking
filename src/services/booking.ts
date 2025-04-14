'use server';

/**
 * Represents a booking with its details.
 */
export interface BookingType {
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

  /**
   * The seats booked
   */
  seats: string[];
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

import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

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
 * @param seats The seats to book.
 * @returns A promise that resolves to a Booking object.
 */
export async function bookTickets(movieId: string, showtime: string, seats: string[]): Promise<BookingType> {
  await dbConnect();

  const { pricePerTicket } = await getAvailability(movieId, showtime);
  const numberOfTickets = seats.length;
  const totalCost = numberOfTickets * pricePerTicket;

  const booking = new Booking({
    movieId,
    showtime,
    numberOfTickets,
    totalCost,
    seats,
  });

  await booking.save();

  return {
    movieId,
    showtime,
    numberOfTickets,
    totalCost,
    seats,
  };
}
