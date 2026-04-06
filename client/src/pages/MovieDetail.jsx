import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, ArrowLeft, Star, Calendar, Clock, Users, Heart, Plus, Share2, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample movie data (in production, this would come from an API)
  const movieDatabase = {
    '1': {
      id: 1,
      title: "Stranger Things",
      description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
      longDescription: "In this Netflix original series, set in the 1980s, a small town in Indiana is rocked by the disappearance of a young boy. As the search intensifies, a mysterious girl with psychokinetic abilities appears, and a group of kids uncover a secret government experiment and a gateway to another dimension. The series blends science fiction, horror, and nostalgia as it follows the intertwined stories of the residents of Hawkins, Indiana.",
      type: "Series",
      maturity: "TV-14",
      year: "2016",
      duration: "4 Seasons",
      rating: "8.7",
      genres: ["Drama", "Sci-Fi", "Thriller", "Horror"],
      cast: ["Winona Ryder", "David Harbour", "Millie Bobby Brown", "Finn Wolfhard", "Gaten Matarazzo", "Caleb McLaughlin", "Noah Schnapp", "Natalia Dyer", "Charlie Heaton", "Joe Keery"],
      director: ["The Duffer Brothers"],
      writer: ["The Duffer Brothers"],
      producer: ["Shawn Levy", "Dan Cohen"],
      language: "English",
      country: "United States",
      awards: ["Screen Actors Guild Award", "Emmy Award", "Golden Globe nomination"],
      trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      backdrop: "https://images.unsplash.com/photo-1594908900066-3f47337549d0?w=1920&h=1080&fit=crop",
      poster: "https://picsum.photos/seed/stranger-things-poster/400/600",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/Stranger_Things_logo.png",
      images: [
        "https://picsum.photos/seed/stranger-things-1/1920/1080",
        "https://picsum.photos/seed/stranger-things-2/1920/1080",
        "https://picsum.photos/seed/stranger-things-3/1920/1080",
        "https://picsum.photos/seed/stranger-things-4/1920/1080"
      ],
      episodes: [
        { season: 1, episodes: 8, year: "2016" },
        { season: 2, episodes: 9, year: "2017" },
        { season: 3, episodes: 8, year: "2019" },
        { season: 4, episodes: 9, year: "2022" }
      ],
      similarMovies: [
        { id: 2, title: "The Crown", poster: "https://picsum.photos/seed/the-crown/200/300" },
        { id: 3, title: "The Witcher", poster: "https://picsum.photos/seed/the-witcher/200/300" },
        { id: 4, title: "Dark", poster: "https://picsum.photos/seed/dark/200/300" },
        { id: 5, title: "Black Mirror", poster: "https://picsum.photos/seed/black-mirror/200/300" }
      ]
    },
    '2': {
      id: 2,
      title: "The Crown",
      description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
      longDescription: "The Crown traces the life of Queen Elizabeth II from her wedding in 1947 to the present day. Each season covers roughly a decade of her reign, exploring the personal relationships, political intrigues, and historical events that defined the British monarchy. The series offers a compelling look at the balance between tradition and modernity, duty and personal desire.",
      type: "Series",
      maturity: "TV-MA",
      year: "2016",
      duration: "6 Seasons",
      rating: "8.6",
      genres: ["Drama", "History", "Biography"],
      cast: ["Claire Foy", "Olivia Colman", "Imelda Staunton", "Matt Smith", "Josh O'Connor", "Elizabeth Debicki"],
      director: ["Stephen Daldry", "Philip Martin", "Benjamin Caron"],
      writer: ["Peter Morgan"],
      producer: ["Andy Harries", "Stephen Daldry", "Peter Morgan"],
      language: "English",
      country: "United Kingdom",
      awards: ["Golden Globe", "Emmy Award", "BAFTA Award"],
      trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      backdrop: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop",
      poster: "https://picsum.photos/seed/the-crown-poster/400/600",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/5a/The_Crown_logo.png",
      images: [
        "https://picsum.photos/seed/the-crown-1/1920/1080",
        "https://picsum.photos/seed/the-crown-2/1920/1080",
        "https://picsum.photos/seed/the-crown-3/1920/1080"
      ],
      episodes: [
        { season: 1, episodes: 10, year: "2016" },
        { season: 2, episodes: 10, year: "2017" },
        { season: 3, episodes: 10, year: "2019" },
        { season: 4, episodes: 10, year: "2020" },
        { season: 5, episodes: 10, year: "2022" },
        { season: 6, episodes: 10, year: "2023" }
      ],
      similarMovies: [
        { id: 1, title: "Stranger Things", poster: "https://picsum.photos/seed/stranger-things/200/300" },
        { id: 3, title: "The Witcher", poster: "https://picsum.photos/seed/the-witcher/200/300" },
        { id: 6, title: "Downton Abbey", poster: "https://picsum.photos/seed/downton/200/300" }
      ]
    }
  };

  useEffect(() => {
    // Simulate loading movie data
    setTimeout(() => {
      const movieData = movieDatabase[id] || movieDatabase['1'];
      setMovie(movieData);
      setLoading(false);
    }, 500);
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % movie.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + movie.images.length) % movie.images.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Movie not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Backdrop */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src={movie.images[currentImageIndex]} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20 p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
            >
              <ArrowLeft size={24} />
              <span>Back</span>
            </button>
            
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Heart size={20} />
              </button>
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Image Navigation */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <ChevronRight size={24} />
        </button>

        {/* Movie Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <img 
              src={movie.logo} 
              alt={movie.title}
              className="h-20 md:h-32 mb-6 object-contain"
            />
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-green-400 font-semibold">{movie.rating}/10</span>
              <span className="text-white/70">{movie.year}</span>
              <span className="border border-white/60 px-2 py-1 text-sm text-white">{movie.maturity}</span>
              <span className="text-white/70">{movie.duration}</span>
              <span className="border border-white/60 px-2 py-1 text-sm text-white">HD</span>
            </div>

            <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6">
              {movie.description}
            </p>

            <div className="flex gap-4 mb-6">
              <button className="flex items-center gap-2 px-8 py-3 bg-white text-black hover:bg-gray-200 rounded transition-colors">
                <Play size={20} fill="black" />
                Play
              </button>
              <button className="flex items-center gap-2 px-8 py-3 bg-gray-600/80 text-white hover:bg-gray-500 rounded transition-colors">
                <Download size={20} />
                Download
              </button>
              <button className="flex items-center gap-2 px-8 py-3 bg-gray-600/80 text-white hover:bg-gray-500 rounded transition-colors">
                <Plus size={20} />
                My List
              </button>
            </div>

            <div className="flex gap-2 flex-wrap">
              {movie.genres.map((genre, index) => (
                <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6">About {movie.title}</h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            {movie.longDescription}
          </p>

          {/* Cast & Crew */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Cast & Crew</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Director:</span>
                  <span className="ml-2">{movie.director.join(', ')}</span>
                </div>
                <div>
                  <span className="text-gray-400">Writer:</span>
                  <span className="ml-2">{movie.writer.join(', ')}</span>
                </div>
                <div>
                  <span className="text-gray-400">Producer:</span>
                  <span className="ml-2">{movie.producer.join(', ')}</span>
                </div>
                <div>
                  <span className="text-gray-400">Cast:</span>
                  <span className="ml-2">{movie.cast.slice(0, 5).join(', ')}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Language:</span>
                  <span className="ml-2">{movie.language}</span>
                </div>
                <div>
                  <span className="text-gray-400">Country:</span>
                  <span className="ml-2">{movie.country}</span>
                </div>
                <div>
                  <span className="text-gray-400">Awards:</span>
                  <span className="ml-2">{movie.awards.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Episodes (for series) */}
          {movie.type === 'Series' && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Episodes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {movie.episodes.map((season, index) => (
                  <div key={index} className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Season {season.season}</h4>
                    <p className="text-gray-400">{season.episodes} episodes • {season.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Similar Movies */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Similar Titles</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movie.similarMovies.map((similarMovie, index) => (
                <div 
                  key={index}
                  className="cursor-pointer group"
                  onClick={() => navigate(`/movie/${similarMovie.id}`)}
                >
                  <img 
                    src={similarMovie.poster} 
                    alt={similarMovie.title}
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                  <p className="mt-2 text-sm text-gray-300 group-hover:text-white transition-colors">
                    {similarMovie.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MovieDetail;
