'use client';

import {useEffect, useState} from 'react';
import {getMovies, Movie} from '@/services/movie-listings';
import {bookTickets} from '@/services/booking';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Card, CardContent, CardHeader, CardTitle, CardFooter} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {toast} from '@/hooks/use-toast';
import {Toaster} from '@/components/ui/toaster';
import {useParams, useRouter} from 'next/navigation';

export default function BookingPage() {
  const {movieId} = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);
  const [numberOfTickets, setNumberOfTickets] = useState<number>(1);
  const [bookingSummary, setBookingSummary] = useState<any>(null); // replace any with Booking type

  useEffect(() => {
    const loadMovie = async () => {
      if (movieId) {
        const movieList = await getMovies();
        const selectedMovie = movieList.find((m) => m.id === movieId);
        setMovie(selectedMovie || null);
      }
    };

    loadMovie();
  }, [movieId]);

  const handleShowtimeSelection = (showtime: string) => {
    setSelectedShowtime(showtime);
    setBookingSummary(null);
  };

  const handleTicketNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setNumberOfTickets(value > 0 ? value : 1);
    setBookingSummary(null);
  };

  const handleBookTickets = async () => {
    if (movie && selectedShowtime) {
      try {
        const booking = await bookTickets(movie.id, selectedShowtime, numberOfTickets);
        setBookingSummary(booking);
        toast({
          title: 'Success',
          description: 'Booking successful!',
        });
      } catch (error) {
        console.error('Booking failed:', error);
        toast({
          title: 'Error',
          description: 'Booking failed. Please try again.',
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'Warning',
        description: 'Please select a movie and showtime.',
      });
    }
  };

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Toaster />
        <h1 className="text-2xl font-bold mb-4">CineBook</h1>
        <p>Movie not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">CineBook - Booking</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Movie Selection</h2>
        <Card>
          <CardHeader>
            <CardTitle>{movie.title}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label htmlFor="showtime">Showtime</Label>
              <Select onValueChange={handleShowtimeSelection}>
                <SelectTrigger id="showtime">
                  <SelectValue placeholder="Select a showtime" />
                </SelectTrigger>
                <SelectContent>
                  {movie.showtimes.map((showtime) => (
                    <SelectItem key={showtime} value={showtime}>
                      {showtime}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tickets">Number of Tickets</Label>
              <Input
                type="number"
                id="tickets"
                min="1"
                value={numberOfTickets}
                onChange={handleTicketNumberChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleBookTickets}>Book Tickets</Button>
          </CardFooter>
        </Card>
      </section>

      {/* Booking Summary */}
      {bookingSummary && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Booking Summary</h2>
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <p>Movie: {movie.title}</p>
              <p>Showtime: {bookingSummary.showtime}</p>
              <p>Number of Tickets: {bookingSummary.numberOfTickets}</p>
            </CardContent>
            <CardFooter>
              <p className="text-lg font-semibold">Total Cost: ${bookingSummary.totalCost}</p>
            </CardFooter>
          </Card>
        </section>
      )}
    </div>
  );
}
