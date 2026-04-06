import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, Sparkles, Clock, TrendingUp, Film, Heart, Star, Zap, Brain, X } from 'lucide-react';
import { movieDatabase, searchIntents } from '../data/movieDatabase';
import '../styles/components.css';

const AISearch = ({ onSearch, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // AI Intent Recognition
  const analyzeIntent = (userQuery) => {
    const lowerQuery = userQuery.toLowerCase();
    
    // Check for predefined intents
    for (const [intent, data] of Object.entries(searchIntents)) {
      if (lowerQuery.includes(intent.toLowerCase()) || 
          intent.toLowerCase().includes(lowerQuery)) {
        return {
          type: 'intent_match',
          confidence: 0.9,
          data,
          explanation: data.explanation
        };
      }
    }
    
    // AI-powered semantic analysis
    const keywords = {
      'dark': { mood: 'dark', genre: 'thriller' },
      'happy': { mood: 'hopeful', genre: 'comedy' },
      'funny': { genre: 'comedy', mood: 'lighthearted' },
      'action': { genre: 'action', mood: 'adrenaline' },
      'romantic': { genre: 'romance', mood: 'emotional' },
      'sci-fi': { genre: 'sci-fi', mood: 'thought-provoking' },
      'short': { duration: 'short' },
      'quick': { duration: 'short' },
      'episode': { type: 'episode' },
      'movie': { type: 'movie' },
      'new': { year: 2024 },
      'latest': { year: 2024 }
    };
    
    const detectedKeywords = [];
    for (const [keyword, attributes] of Object.entries(keywords)) {
      if (lowerQuery.includes(keyword)) {
        detectedKeywords.push({ keyword, ...attributes });
      }
    }
    
    if (detectedKeywords.length > 0) {
      return {
        type: 'semantic_match',
        confidence: 0.7,
        keywords: detectedKeywords,
        explanation: `Found ${detectedKeywords.length} matching keywords in your query`
      };
    }
    
    return {
      type: 'general_search',
      confidence: 0.5,
      explanation: 'Performing general content search'
    };
  };

  // Search across all content
  const performSearch = (searchQuery) => {
    const intent = analyzeIntent(searchQuery);
    setIsAIProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let results = [];
      
      if (intent.type === 'intent_match') {
        results = intent.data.suggestions.map(title => {
          const allContent = [
            ...movieDatabase.trending,
            ...movieDatabase.comedy,
            ...movieDatabase.drama,
            ...movieDatabase.action,
            ...movieDatabase.documentaries,
            ...movieDatabase.tvShows
          ];
          return allContent.find(item => item.title === title) || null;
        }).filter(Boolean);
      } else if (intent.type === 'semantic_match') {
        const allContent = [
          ...movieDatabase.trending,
          ...movieDatabase.comedy,
          ...movieDatabase.drama,
          ...movieDatabase.action,
          ...movieDatabase.documentaries,
          ...movieDatabase.tvShows
        ];
        
        results = allContent.filter(item => {
          return intent.keywords.some(keyword => {
            if (keyword.genre && item.genre.some(g => g.toLowerCase().includes(keyword.genre))) return true;
            if (keyword.mood && item.mood && item.mood.some(m => m.includes(keyword.mood))) return true;
            if (keyword.type && (item.episodes ? 'episode' : 'movie') === keyword.type) return true;
            if (keyword.year && item.year === keyword.year) return true;
            return false;
          });
        });
      } else {
        // General text search
        const allContent = [
          ...movieDatabase.trending,
          ...movieDatabase.comedy,
          ...movieDatabase.drama,
          ...movieDatabase.action,
          ...movieDatabase.documentaries,
          ...movieDatabase.tvShows
        ];
        
        results = allContent.filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
          item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      setSuggestions(results.slice(0, 6));
      setIsAIProcessing(false);
      
      // Add to search history
      if (searchQuery.trim()) {
        setSearchHistory(prev => [
          { query: searchQuery, timestamp: new Date() },
          ...prev.slice(0, 4)
        ]);
      }
      
      if (onSearch) {
        onSearch(results, intent);
      }
    }, 800);
  };

  // Voice search simulation
  const startVoiceSearch = () => {
    setIsListening(true);
    
    // Simulate voice recognition
    setTimeout(() => {
      const sampleQueries = [
        "something dark like dark but with a happy ending",
        "I have 20 minutes, show me a funny sitcom episode about weddings",
        "action packed movies",
        "thought provoking documentaries",
        "new sci-fi releases"
      ];
      
      const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setQuery(randomQuery);
      setIsListening(false);
      performSearch(randomQuery);
    }, 2000);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 2) {
      performSearch(value);
    } else {
      setSuggestions([]);
    }
  };

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query);
      setShowResults(true);
    }
  };

  // Handle result selection
  const handleResultSelect = (result) => {
    setShowResults(false);
    setQuery('');
    setSuggestions([]);
    
    if (onNavigate) {
      onNavigate(`/watch/${result.id}`);
    }
    
    if (window.showNotification) {
      window.showNotification('success', `🎬 Playing ${result.title}...`, 3000, 'Content Found');
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="ai-search-container" ref={searchRef}>
      {/* AI Search Button */}
      <button
        onClick={() => setShowResults(!showResults)}
        className={`ai-search-button-professional ${showResults ? 'active' : ''}`}
        title="AI Search"
      >
        {isAIProcessing ? (
          <Brain className="ai-processing" size={18} />
        ) : (
          <Search size={18} />
        )}
        <Sparkles size={14} />
      </button>

      {/* Expanded Search Panel */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="ai-search-panel"
          >
            <form onSubmit={handleSubmit} className="ai-search-form">
              <div className="ai-search-input-wrapper">
                <div className="ai-search-icon">
                  {isAIProcessing ? (
                    <Brain className="ai-processing" size={20} />
                  ) : (
                    <Search size={20} />
                  )}
                </div>
                
                <input
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Ask me anything... 'Something dark like Dark but with a happy ending'"
                  className="ai-search-input"
                  autoFocus
                />
                
                <div className="ai-search-actions">
                  <button
                    type="button"
                    onClick={startVoiceSearch}
                    className={`ai-voice-btn ${isListening ? 'listening' : ''}`}
                    title="Voice search"
                  >
                    <Mic size={18} />
                  </button>
                  
                  {query && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('');
                        setSuggestions([]);
                      }}
                      className="ai-clear-btn"
                      title="Clear search"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>
              
              {/* AI Processing Indicator */}
              {isAIProcessing && (
                <div className="ai-processing-indicator">
                  <Sparkles className="sparkle" size={14} />
                  <span>AI is understanding your request...</span>
                </div>
              )}
            </form>

            {/* Search Results */}
            {(suggestions.length > 0 || searchHistory.length > 0) && (
              <div className="ai-search-results">
                {/* Search Results */}
                {suggestions.length > 0 && (
                  <div className="ai-results-section">
                    <div className="ai-results-header">
                      <Sparkles size={16} />
                      <span>AI-Powered Results</span>
                    </div>
                    
                    {suggestions.map((result, index) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="ai-result-item"
                        onClick={() => handleResultSelect(result)}
                      >
                        <div className="ai-result-thumbnail">
                          <img src={result.thumbnail} alt={result.title} />
                        </div>
                        
                        <div className="ai-result-content">
                          <div className="ai-result-title">{result.title}</div>
                          <div className="ai-result-meta">
                            <span>{result.genre[0]}</span>
                            <span>•</span>
                            <span>{result.rating} ⭐</span>
                            <span>•</span>
                            <span>{result.duration}</span>
                          </div>
                          <div className="ai-result-description">
                            {result.description.substring(0, 100)}...
                          </div>
                        </div>
                        
                        <div className="ai-result-actions">
                          <button className="ai-play-btn">
                            <Zap size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                
                {/* Search History */}
                {searchHistory.length > 0 && (
                  <div className="ai-history-section">
                    <div className="ai-results-header">
                      <Clock size={16} />
                      <span>Recent Searches</span>
                    </div>
                    
                    {searchHistory.map((item, index) => (
                      <div
                        key={index}
                        className="ai-history-item"
                        onClick={() => {
                          setQuery(item.query);
                          performSearch(item.query);
                        }}
                      >
                        <Clock size={14} />
                        <span>{item.query}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* AI Suggestions */}
                <div className="ai-suggestions-section">
                  <div className="ai-results-header">
                    <TrendingUp size={16} />
                    <span>Try asking</span>
                  </div>
                  
                  <div className="ai-suggestion-chips">
                    {[
                      "Dark thrillers with hope",
                      "20 min comedy episodes",
                      "New sci-fi releases",
                      "Action packed movies",
                      "Thought provoking docs"
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuery(suggestion);
                          performSearch(suggestion);
                        }}
                        className="ai-suggestion-chip"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AISearch;
