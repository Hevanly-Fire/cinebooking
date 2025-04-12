'use client';

import {useEffect, useState} from 'react';
import {getMovies, Movie} from '@/services/movie-listings';
import {bookTickets} from '@/services/booking';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {suggestSimilarMovies} from '@/ai/flows/suggest-similar-movies';
import {toast} from '@/hooks/use-toast';
import {Toaster} from '@/components/ui/toaster';
import {Loader2} from 'lucide-react';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);
  const [numberOfTickets, setNumberOfTickets] = useState<number>(1);
  const [bookingSummary, setBookingSummary] = useState<any>(null); // replace any with Booking type
  const [similarMovies, setSimilarMovies] = useState<string[]>([]);
  const [isLoadingSimilarMovies, setIsLoadingSimilarMovies] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      const movieList = await getMovies();
      setMovies(movieList);
    };

    loadMovies();
  }, []);

  useEffect(() => {
    const loadSimilarMovies = async () => {
      if (selectedMovie) {
        setIsLoadingSimilarMovies(true);
        try {
          const {suggestions} = await suggestSimilarMovies({
            title: selectedMovie.title,
            genre: 'Action', // Replace with actual genre if available
            actors: 'Unknown', // Replace with actual actors if available
            keywords: selectedMovie.title, // Using title as keyword for simplicity
          });
          setSimilarMovies(suggestions);
        } catch (error) {
          console.error('Failed to load similar movies:', error);
          toast({
            title: 'Error',
            description: 'Failed to load similar movies.',
            variant: 'destructive',
          });
        } finally {
          setIsLoadingSimilarMovies(false);
        }
      } else {
        setSimilarMovies([]);
      }
    };

    loadSimilarMovies();
  }, [selectedMovie]);

  const handleMovieSelection = (movieId: string) => {
    const movie = movies.find((m) => m.id === movieId);
    setSelectedMovie(movie || null);
    setSelectedShowtime(null);
    setBookingSummary(null);
  };

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
    if (selectedMovie && selectedShowtime) {
      try {
        const booking = await bookTickets(selectedMovie.id, selectedShowtime, numberOfTickets);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">CineBook</h1>

      {/* Movie Listings */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Available Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <Card key={movie.id} onClick={() => handleMovieSelection(movie.id)} className="cursor-pointer">
              <CardHeader>
                <CardTitle>{movie.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={movie.posterUrl} alt={movie.title} className="w-full h-48 object-cover rounded-md mb-2" />
                <CardDescription>
                  Showtimes: {movie.showtimes.join(', ')}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {selectedMovie && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Movie Selection</h2>
          <Card>
            <CardHeader>
              <CardTitle>{selectedMovie.title}</CardTitle>
              <CardDescription>Select showtime and number of tickets</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <Label htmlFor="showtime">Showtime</Label>
                <Select onValueChange={handleShowtimeSelection}>
                  <SelectTrigger id="showtime">
                    <SelectValue placeholder="Select a showtime" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedMovie.showtimes.map((showtime) => (
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
      )}

      {/* Similar Movie Suggestions */}
      {selectedMovie && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Similar Movies</h2>
          {isLoadingSimilarMovies ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="animate-spin" />
              <span>Loading suggestions...</span>
            </div>
          ) : (
            <ul className="list-disc pl-5">
              {similarMovies.map((movie, index) => (
                <li key={index}>{movie}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Booking Summary */}
      {bookingSummary && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Booking Summary</h2>
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <p>Movie: {selectedMovie?.title}</p>
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
