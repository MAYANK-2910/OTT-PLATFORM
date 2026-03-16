// Comprehensive Movie Database for Professional OTT Platform
export const movieDatabase = {
  trending: [
    {
      id: 1,
      title: "Cosmic Odyssey",
      description: "A breathtaking journey through space and time as humanity discovers it's not alone in the universe.",
      genre: ["Sci-Fi", "Adventure", "Drama"],
      year: 2024,
      rating: 8.7,
      duration: "2h 28min",
      maturity: "PG-13",
      cast: ["Chris Evans", "Zendaya", "Oscar Isaac"],
      director: "Denis Villeneuve",
      thumbnail: "https://picsum.photos/seed/cosmic-odyssey/300/450",
      hero: "https://picsum.photos/seed/cosmic-odyssey-hero/1920/1080",
      tags: ["space", "aliens", "epic", "discovery"],
      mood: ["adventurous", "thought-provoking", "awe-inspiring"],
      scenes: {
        chapters: [
          { timestamp: "00:00", title: "The Discovery", description: "Scientists detect the first signal" },
          { timestamp: "00:25", title: "First Contact", description: "Humanity meets extraterrestrial intelligence" },
          { timestamp: "01:15", title: "The Journey", description: "Embarking on the cosmic voyage" },
          { timestamp: "02:05", title: "Revelation", description: "The truth about our place in the universe" }
        ],
        highlights: ["00:25-00:35", "01:15-01:25", "02:05-02:15"]
      },
      aiPersonalization: {
        actionFans: { thumbnail: "cosmic-odyssey-action", hero: "cosmic-odyssey-action-hero" },
        romanceFans: { thumbnail: "cosmic-odyssey-romance", hero: "cosmic-odyssey-romance-hero" },
        scifiFans: { thumbnail: "cosmic-odyssey-scifi", hero: "cosmic-odyssey-scifi-hero" }
      }
    },
    {
      id: 2,
      title: "Neon Shadows",
      description: "In a cyberpunk dystopia, a detective uncovers a conspiracy that could change the fate of humanity.",
      genre: ["Cyberpunk", "Thriller", "Mystery"],
      year: 2024,
      rating: 8.9,
      duration: "2h 15min",
      maturity: "R",
      cast: ["Ryan Gosling", "Ana de Armas", "Jared Leto"],
      director: "Denis Villeneuve",
      thumbnail: "https://picsum.photos/seed/neon-shadows/300/450",
      hero: "https://picsum.photos/seed/neon-shadows-hero/1920/1080",
      tags: ["cyberpunk", "detective", "conspiracy", "dystopian"],
      mood: ["dark", "intense", "mysterious", "futuristic"],
      scenes: {
        chapters: [
          { timestamp: "00:00", title: "The Case", description: "A mysterious client approaches" },
          { timestamp: "00:30", title: "Deep Dive", description: "Investigating the neon-lit underworld" },
          { timestamp: "01:20", title: "The Truth", description: "Uncovering the massive conspiracy" },
          { timestamp: "01:50", title: "Showdown", description: "Final confrontation in the rain" }
        ],
        highlights: ["00:30-00:40", "01:20-01:30", "01:50-02:00"]
      }
    },
    {
      id: 3,
      title: "The Last Garden",
      description: "In a world without nature, one botanist discovers a secret that could restore Earth's green heart.",
      genre: ["Drama", "Sci-Fi", "Hope"],
      year: 2024,
      rating: 8.5,
      duration: "2h 05min",
      maturity: "PG",
      cast: ["Saoirse Ronan", "Timothée Chalamet", "Meryl Streep"],
      director: "Greta Gerwig",
      thumbnail: "https://picsum.photos/seed/last-garden/300/450",
      hero: "https://picsum.photos/seed/last-garden-hero/1920/1080",
      tags: ["nature", "hope", "environmental", "emotional"],
      mood: ["hopeful", "emotional", "inspiring", "gentle"],
      scenes: {
        chapters: [
          { timestamp: "00:00", title: "The Wasteland", description: "Life in the artificial world" },
          { timestamp: "00:35", title: "The Discovery", description: "Finding the first seed" },
          { timestamp: "01:15", title: "Growing Hope", description: "Nurturing the new life" },
          { timestamp: "01:45", title: "Rebirth", description: "Nature returns to Earth" }
        ],
        highlights: ["00:35-00:45", "01:15-01:25", "01:45-01:55"]
      }
    }
  ],
  
  comedy: [
    {
      id: 4,
      title: "Office Chaos",
      description: "When the CEO accidentally joins the company Slack group, hilarious misunderstandings ensue.",
      genre: ["Comedy", "Workplace", "Modern"],
      year: 2024,
      rating: 7.8,
      duration: "1h 35min",
      maturity: "PG-13",
      cast: ["Paul Rudd", "Awkwafina", "Kenan Thompson"],
      director: "Judd Apatow",
      thumbnail: "https://picsum.photos/seed/office-chaos/300/450",
      hero: "https://picsum.photos/seed/office-chaos-hero/1920/1080",
      tags: ["workplace", "comedy", "tech", "modern"],
      mood: ["funny", "lighthearted", "relatable", "chaotic"],
      scenes: {
        chapters: [
          { timestamp: "00:00", title: "Monday Morning", description: "The CEO's big mistake" },
          { timestamp: "00:20", title: "Slack Attack", description: "Misunderstandings in chat" },
          { timestamp: "00:45", title: "The Cover-up", description: "Trying to fix the mess" },
          { timestamp: "01:10", title: "Coming Clean", description: "The truth comes out" }
        ],
        highlights: ["00:20-00:30", "00:45-00:55", "01:10-01:20"]
      }
    },
    {
      id: 5,
      title: "Wedding Crashers 2.0",
      description: "The original crashers are back, but this time they're accidentally planning their own weddings.",
      genre: ["Romantic Comedy", "Wedding", "Sequel"],
      year: 2024,
      rating: 7.5,
      duration: "1h 48min",
      maturity: "PG-13",
      cast: ["Owen Wilson", "Vince Vaughn", "Rebel Wilson"],
      director: "David Dobkin",
      thumbnail: "https://picsum.photos/seed/wedding-crashers-2/300/450",
      hero: "https://picsum.photos/seed/wedding-crashers-2-hero/1920/1080",
      tags: ["wedding", "comedy", "romance", "sequel"],
      mood: ["funny", "romantic", "chaotic", "heartwarming"],
      scenes: {
        chapters: [
          { timestamp: "00:00", title: "The Proposal", description: "Both guys get engaged" },
          { timestamp: "00:35", title: "Planning Hell", description: "Wedding planning disasters" },
          { timestamp: "01:15", title: "Old Habits", description: "Crashing other weddings" },
          { timestamp: "01:35", title: "I Do's", description: "The double wedding" }
        ],
        highlights: ["00:35-00:45", "01:15-01:25", "01:35-01:45"]
      }
    }
  ],
  
  drama: [
    {
      id: 6,
      title: "The Architect's Dream",
      description: "An aging architect gets one last chance to build his masterpiece while reconnecting with his estranged daughter.",
      genre: ["Drama", "Family", "Architecture"],
      year: 2024,
      rating: 8.8,
      duration: "2h 20min",
      maturity: "PG-13",
      cast: ["Anthony Hopkins", "Florence Pugh", "Tom Hiddleston"],
      director: "Christopher Nolan",
      thumbnail: "https://picsum.photos/seed/architect-dream/300/450",
      hero: "https://picsum.photos/seed/architect-dream-hero/1920/1080",
      tags: ["architecture", "family", "dreams", "legacy"],
      mood: ["emotional", "inspiring", "thoughtful", "bittersweet"],
      scenes: {
        chapters: [
          { timestamp: "00:00", title: "The Blueprint", description: "The architect's final design" },
          { timestamp: "00:40", title: "The Return", description: "Daughter comes home" },
          { timestamp: "01:20", title: "Building Bridges", description: "Rebuilding their relationship" },
          { timestamp: "01:55", title: "The Masterpiece", description: "Completion of the dream" }
        ],
        highlights: ["00:40-00:50", "01:20-01:30", "01:55-02:05"]
      }
    }
  ],
  
  action: [
    {
      id: 7,
      title: "Velocity Break",
      description: "A street racer gets pulled into a high-stakes heist where the only way out is to drive faster than ever before.",
      genre: ["Action", "Thriller", "Racing"],
      year: 2024,
      rating: 8.2,
      duration: "2h 10min",
      maturity: "PG-13",
      cast: ["Keanu Reeves", "Charlize Theron", "Idris Elba"],
      director: "David Leitch",
      thumbnail: "https://picsum.photos/seed/velocity-break/300/450",
      hero: "https://picsum.photos/seed/velocity-break-hero/1920/1080",
      tags: ["racing", "heist", "action", "fast cars"],
      mood: ["adrenaline", "intense", "exciting", "thrilling"],
      scenes: {
        chapters: [
          { timestamp: "00:00", title: "The Race", description: "Underground street racing" },
          { timestamp: "00:30", title: "The Offer", description: "The dangerous proposition" },
          { timestamp: "01:15", title: "The Heist", description: "High-speed robbery" },
          { timestamp: "01:45", title: "The Escape", description: "Final chase sequence" }
        ],
        highlights: ["00:30-00:40", "01:15-01:25", "01:45-01:55"]
      }
    }
  ],
  
  documentaries: [
    {
      id: 8,
      title: "Digital Minds",
      description: "An exploration of how AI is reshaping human creativity, consciousness, and the future of work.",
      genre: ["Documentary", "Technology", "AI"],
      year: 2024,
      rating: 9.1,
      duration: "1h 45min",
      maturity: "PG",
      cast: ["Various Experts"],
      director: "Alex Gibney",
      thumbnail: "https://picsum.photos/seed/digital-minds/300/450",
      hero: "https://picsum.photos/seed/digital-minds-hero/1920/1080",
      tags: ["AI", "technology", "future", "innovation"],
      mood: ["informative", "thought-provoking", "futuristic", "inspiring"],
      scenes: {
        chapters: [
          { timestamp: "00:00", title: "The Dawn", description: "AI's early days" },
          { timestamp: "00:25", title: "The Revolution", description: "Machine learning breakthrough" },
          { timestamp: "00:50", title: "The Impact", description: "AI in daily life" },
          { timestamp: "01:20", title: "The Future", description: "What comes next" }
        ],
        highlights: ["00:25-00:35", "00:50-01:00", "01:20-01:30"]
      }
    }
  ],
  
  tvShows: [
    {
      id: 9,
      title: "Quantum Leap",
      description: "Scientists discover how to jump between parallel universes, but each leap changes them in unexpected ways.",
      genre: ["Sci-Fi", "Mystery", "Drama"],
      year: 2024,
      rating: 8.6,
      duration: "Season 1",
      maturity: "PG-13",
      cast: ["Evan Peters", "Anya Taylor-Joy", "John Boyega"],
      director: "Various",
      thumbnail: "https://picsum.photos/seed/quantum-leap/300/450",
      hero: "https://picsum.photos/seed/quantum-leap-hero/1920/1080",
      tags: ["parallel universes", "sci-fi", "mystery", "character development"],
      mood: ["mind-bending", "suspenseful", "emotional", "intellectual"],
      episodes: [
        { id: 1, title: "The First Jump", description: "Initial breakthrough", duration: "45min" },
        { id: 2, title: "Parallel Lives", description: "Meeting alternate selves", duration: "45min" },
        { id: 3, title: "The Convergence", description: "Universes collide", duration: "45min" },
        { id: 4, title: "The Choice", description: "Which reality to choose", duration: "45min" }
      ],
      scenes: {
        chapters: [
          { timestamp: "00:00", title: "The Discovery", description: "Breaking through dimensions" },
          { timestamp: "00:20", title: "First Contact", description: "Meeting alternate versions" },
          { timestamp: "00:35", title: "The Crisis", description: "Reality begins to break" },
          { timestamp: "00:50", title: "Resolution", description: "Finding the way back" }
        ],
        highlights: ["00:20-00:30", "00:35-00:45", "00:50-01:00"]
      }
    },
    {
      id: 10,
      title: "Chef's Table: AI",
      description: "World-renowned chefs use artificial intelligence to create revolutionary dishes and dining experiences.",
      genre: ["Reality", "Food", "Technology"],
      year: 2024,
      rating: 8.4,
      duration: "Season 1",
      maturity: "G",
      cast: ["Various Chefs"],
      director: "Various",
      thumbnail: "https://picsum.photos/seed/chefs-table-ai/300/450",
      hero: "https://picsum.photos/seed/chefs-table-ai-hero/1920/1080",
      tags: ["cooking", "AI", "innovation", "fine dining"],
      mood: ["inspiring", "creative", "appetizing", "innovative"],
      episodes: [
        { id: 1, title: "Digital Gastronomy", description: "AI-designed menus", duration: "50min" },
        { id: 2, title: "Robot Chefs", description: "Automated kitchens", duration: "50min" },
        { id: 3, title: "Future Flavors", description: "AI-created ingredients", duration: "50min" },
        { id: 4, title: "Smart Dining", description: "Personalized experiences", duration: "50min" }
      ]
    }
  ]
};

// AI Search Intent Mapping
export const searchIntents = {
  "something dark like dark": {
    query: "genre:thriller OR genre:mystery OR mood:dark",
    suggestions: ["Neon Shadows", "The Architect's Dream"],
    explanation: "Dark, mysterious content with complex narratives"
  },
  "happy ending": {
    query: "mood:hopeful OR mood:heartwarming",
    suggestions: ["The Last Garden", "Wedding Crashers 2.0"],
    explanation: "Content with optimistic, uplifting conclusions"
  },
  "20 minutes funny sitcom": {
    query: "genre:comedy AND duration:<30min",
    suggestions: ["Office Chaos", "Wedding Crashers 2.0"],
    explanation: "Quick, humorous content for short breaks"
  },
  "wedding episode": {
    query: "tags:wedding OR title:Wedding",
    suggestions: ["Wedding Crashers 2.0"],
    explanation: "Wedding-themed entertainment"
  },
  "action packed": {
    query: "genre:action OR mood:adrenaline",
    suggestions: ["Velocity Break", "Cosmic Odyssey"],
    explanation: "High-energy, thrilling content"
  },
  "thought provoking": {
    query: "mood:thought-provoking OR genre:sci-fi",
    suggestions: ["Digital Minds", "Quantum Leap", "Cosmic Odyssey"],
    explanation: "Content that challenges your perspective"
  },
  "family friendly": {
    query: "maturity:G OR maturity:PG",
    suggestions: ["The Last Garden", "Chef's Table: AI"],
    explanation: "Suitable for all ages"
  },
  "new releases": {
    query: "year:2024",
    suggestions: movieDatabase.trending.slice(0, 3),
    explanation: "Latest content from 2024"
  }
};

// User Preference Profiles for AI Personalization
export const userProfiles = {
  actionFan: {
    preferences: ["action", "thriller", "adrenaline"],
    visualStyle: "dynamic",
    thumbnailPreference: "high-impact",
    heroPreference: "explosive"
  },
  romanceFan: {
    preferences: ["romance", "heartwarming", "emotional"],
    visualStyle: "warm",
    thumbnailPreference: "character-focused",
    heroPreference: "intimate"
  },
  scifiFan: {
    preferences: ["sci-fi", "thought-provoking", "futuristic"],
    visualStyle: "sleek",
    thumbnailPreference: "tech-focused",
    heroPreference: "epic-scale"
  },
  comedyFan: {
    preferences: ["comedy", "lighthearted", "funny"],
    visualStyle: "vibrant",
    thumbnailPreference: "expressive",
    heroPreference: "energetic"
  }
};

// AI Predictive Caching Data
export const predictiveCache = {
  userPatterns: {
    bingeWatchers: ["nextEpisode", "similarGenre"],
    casualViewers: ["trending", "shortDuration"],
    explorers: ["newReleases", "differentGenre"]
  },
  cachePriorities: {
    high: ["heroContent", "nextEpisode"],
    medium: ["similarContent", "trending"],
    low: ["deepCatalog", "nicheGenres"]
  }
};
