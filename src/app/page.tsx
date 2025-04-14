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
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [similarMovies, setSimilarMovies] = useState<string[]>([]);
  const [isLoadingSimilarMovies, setIsLoadingSimilarMovies] = useState(false);
  const [activeTab, setActiveTab] = useState('available');
  const { data: session } = useSession();

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

  const filteredMovies = movies.filter((movie) => {
    if (activeTab === 'available') {
      return movie.category === 'available';
    } else if (activeTab === 'coming') {
      return movie.category === 'coming';
    } else if (activeTab === 'blockbuster') {
      return movie.category === 'blockbuster';
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">CineBook</h1>
        {session ? (
          <div className="flex items-center space-x-4">
            <span>{session?.user?.email}</span>
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              Logout
            </Button>
          </div>
        ) : (
          <div>
            <Link href="/login" className="mr-4">
              Login
            </Link>
            <Link href="/register">Register</Link>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList>
          <TabsTrigger value="available">Available Movies</TabsTrigger>
          <TabsTrigger value="coming">Coming Soon</TabsTrigger>
          <TabsTrigger value="blockbuster">Blockbusters</TabsTrigger>
        </TabsList>
        <TabsContent value="available" className="p-0">
          {/* Movie Listings */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Available Movies</h2>
            <div className="flex overflow-x-auto space-x-4">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="w-64 min-w-64 cursor-pointer"
                  onClick={() => handleMovieSelection(movie.id)}
                >
                  <img
                    src={`/posters/${movie.posterUrl}`}
                    alt={movie.title}
                    className="w-48 h-72 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground">Showtimes: {movie.showtimes.join(', ')}</p>
                </div>
              ))}
            </div>
          </section>
        </TabsContent>
        <TabsContent value="coming" className="p-0">
          {/* Coming Soon Listings */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
            <div className="flex overflow-x-auto space-x-4">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="w-64 min-w-64 cursor-pointer"
                  onClick={() => handleMovieSelection(movie.id)}
                >
                  <img
                    src={`/posters/${movie.posterUrl}`}
                    alt={movie.title}
                    className="w-48 h-72 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground">Showtimes: {movie.showtimes.join(', ')}</p>
                </div>
              ))}
            </div>
          </section>
        </TabsContent>
        <TabsContent value="blockbuster" className="p-0">
          {/* Blockbuster Listings */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Blockbusters</h2>
            <div className="flex overflow-x-auto space-x-4">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="w-64 min-w-64 cursor-pointer"
                  onClick={() => handleMovieSelection(movie.id)}
                >
                  <img
                    src={`/posters/${movie.posterUrl}`}
                    alt={movie.title}
                    className="w-48 h-72 object-cover rounded-md mb-2"
                  />
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
