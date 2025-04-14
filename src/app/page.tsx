'use client';

import {useEffect, useState} from 'react';
import {getMovies, Movie, MovieCategory} from '@/services/movie-listings';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from '@/components/ui/card';
import {suggestSimilarMovies} from '@/ai/flows/suggest-similar-movies';
import {toast} from '@/hooks/use-toast';
import {Toaster} from '@/components/ui/toaster';
import {Loader2} from 'lucide-react';
import Link from 'next/link';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [similarMovies, setSimilarMovies] = useState<string[]>([]);
  const [isLoadingSimilarMovies, setIsLoadingSimilarMovies] = useState(false);
  const [activeTab, setActiveTab] = useState(MovieCategory.AVAILABLE);

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
            genre: selectedMovie.genre,
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

  const filteredMovies = (category: MovieCategory) => movies.filter(movie => movie.category === category);

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">CineBook</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList>
          <TabsTrigger value={MovieCategory.AVAILABLE}>Available Movies</TabsTrigger>
          <TabsTrigger value={MovieCategory.COMING}>Coming Soon</TabsTrigger>
          <TabsTrigger value={MovieCategory.BLOCKBUSTER}>Blockbusters</TabsTrigger>
        </TabsList>
        <TabsContent value={MovieCategory.AVAILABLE} className="p-0">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Available Movies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMovies(MovieCategory.AVAILABLE).map((movie) => (
                <div key={movie.id} className="cursor-pointer" onClick={() => handleMovieSelection(movie.id)}>
                  <img src={`/posters/${movie.posterUrl}`} alt={movie.title} className="w-full h-auto rounded-md mb-2" />
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground">Showtimes: {movie.showtimes.join(', ')}</p>
                </div>
              ))}
            </div>
             <h2 className="text-xl font-semibold mb-2 mt-4">Hollywood Movies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMovies(MovieCategory.HOLLYWOOD).map((movie) => (
                <div key={movie.id} className="cursor-pointer" onClick={() => handleMovieSelection(movie.id)}>
                  <img src={`/posters/${movie.posterUrl}`} alt={movie.title} className="w-full h-auto rounded-md mb-2" />
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground">Showtimes: {movie.showtimes.join(', ')}</p>
                </div>
              ))}
            </div>
             <h2 className="text-xl font-semibold mb-2 mt-4">Bollywood Movies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMovies(MovieCategory.BOLLYWOOD).map((movie) => (
                <div key={movie.id} className="cursor-pointer" onClick={() => handleMovieSelection(movie.id)}>
                  <img src={`/posters/${movie.posterUrl}`} alt={movie.title} className="w-full h-auto rounded-md mb-2" />
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground">Showtimes: {movie.showtimes.join(', ')}</p>
                </div>
              ))}
            </div>
          </section>
        </TabsContent>
        <TabsContent value={MovieCategory.COMING} className="p-0">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMovies(MovieCategory.COMING).map((movie) => (
                <div key={movie.id} className="cursor-pointer" onClick={() => handleMovieSelection(movie.id)}>
                  <img src={`/posters/${movie.posterUrl}`} alt={movie.title} className="w-full h-auto rounded-md mb-2" />
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground">Showtimes: {movie.showtimes.join(', ')}</p>
                </div>
              ))}
            </div>
          </section>
        </TabsContent>
        <TabsContent value={MovieCategory.BLOCKBUSTER} className="p-0">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Blockbusters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMovies(MovieCategory.BLOCKBUSTER).map((movie) => (
                <div key={movie.id} className="cursor-pointer" onClick={() => handleMovieSelection(movie.id)}>
                  <img src={`/posters/${movie.posterUrl}`} alt={movie.title} className="w-full h-auto rounded-md mb-2" />
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground">Showtimes: {movie.showtimes.join(', ')}</p>
                </div>
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>

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
                src={`/posters/${selectedMovie.posterUrl}`}
                alt={selectedMovie.title}
                className="w-48 h-72 object-cover rounded-md mb-2"
              />
              <p>Genre: {selectedMovie.genre}</p>
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
