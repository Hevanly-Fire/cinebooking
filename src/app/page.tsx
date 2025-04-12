'use client';

import {useEffect, useState} from 'react';
import {getMovies, Movie} from '@/services/movie-listings';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from '@/components/ui/card';
import {suggestSimilarMovies} from '@/ai/flows/suggest-similar-movies';
import {toast} from '@/hooks/use-toast';
import {Toaster} from '@/components/ui/toaster';
import {Loader2} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
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
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">CineBook</h1>

      {/* Movie Listings */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Available Movies</h2>
        <div className="flex overflow-x-auto space-x-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="w-64 min-w-64 cursor-pointer"
              onClick={() => handleMovieSelection(movie.id)}
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-sm text-muted-foreground">Showtimes: {movie.showtimes.join(', ')}</p>
            </div>
          ))}
        </div>
      </section>

      {selectedMovie && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Movie Details</h2>
          <Card>
            <CardHeader>
              <CardTitle>{selectedMovie.title}</CardTitle>
              <CardDescription>Explore showtimes and book tickets</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <img
                src={selectedMovie.posterUrl}
                alt={selectedMovie.title}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <p>Available Showtimes: {selectedMovie.showtimes.join(', ')}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/booking/${selectedMovie.id}`}>
                <Button>Book Tickets</Button>
              </Link>
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
    </div>
  );
}
