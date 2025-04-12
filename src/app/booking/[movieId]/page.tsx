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
  const [bookingSummary, setBookingSummary] = useState<any>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

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
    if (movie && selectedShowtime && selectedSeats.length > 0) {
      try {
        const booking = await bookTickets(movie.id, selectedShowtime, selectedSeats.length);
        setBookingSummary(booking);
        toast({
          title: 'Success',
          description: 'Booking successful!',
        });
        router.push('/'); // Redirect to home page after booking
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
        description: 'Please select a movie, showtime, and seats.',
      });
    }
  };

  const handleSeatSelection = (seatNumber: string) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const generateSeats = () => {
    const rows = 10;
    const seatsPerRow = 12;
    const seats = [];

    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= seatsPerRow; j++) {
        const seatNumber = `${String.fromCharCode(64 + i)}${j}`;
        seats.push(seatNumber);
      }
    }
    return seats;
  };

  const seats = generateSeats();

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
              <img
                src={`/posters/${movie.posterUrl}`}
                alt={movie.title}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
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
          </CardContent>
          <CardFooter>
            <Button onClick={handleBookTickets} disabled={selectedSeats.length === 0}>
              Book Tickets
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Select Seats</h2>
        <Card>
          <CardHeader>
            <CardTitle>Seating Arrangement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-4">
              <div className="bg-red-500 text-white p-2 rounded">Screen is this way</div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              {seats.map((seatNumber) => (
                <button
                  key={seatNumber}
                  onClick={() => handleSeatSelection(seatNumber)}
                  className={`w-6 h-6 rounded-md flex items-center justify-center
                    ${selectedSeats.includes(seatNumber) ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'}
                    ${Math.random() > 0.7 ? 'bg-gray-500 text-white cursor-not-allowed' : ''}
                  `}
                  disabled={Math.random() > 0.7} // Simulate reserved seats
                >
                  {seatNumber}
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-around">
              <div>
                <div className="w-6 h-6 rounded-md bg-gray-300 inline-block mr-1"></div>
                <span>Available</span>
              </div>
              <div>
                <div className="w-6 h-6 rounded-md bg-gray-500 inline-block mr-1"></div>
                <span>Reserved</span>
              </div>
              <div>
                <div className="w-6 h-6 rounded-md bg-red-500 text-white inline-block mr-1"></div>
                <span>Selected</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

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
              <p>Seats: {selectedSeats.join(', ')}</p>
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
