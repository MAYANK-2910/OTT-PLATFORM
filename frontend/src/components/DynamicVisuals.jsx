import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Zap, Brain, Palette, Film, Heart, Star, TrendingUp, Target, Sparkles } from 'lucide-react';
import { userProfiles } from '../data/movieDatabase';
import '../styles/components.css';

const DynamicVisuals = ({ content, userProfile, onVisualChange }) => {
  const [currentProfile, setCurrentProfile] = useState(userProfiles.scifiFan);
  const [personalizedContent, setPersonalizedContent] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [abTestResults, setAbTestResults] = useState({});
  const [engagementMetrics, setEngagementMetrics] = useState({
    clicks: 0,
    hoverTime: 0,
    conversions: 0
  });

  // AI-powered personalization engine
  const personalizeContent = (content, profile) => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const personalized = { ...content };
      
      // Dynamic thumbnail selection based on user preferences
      if (profile.visualStyle === 'dynamic' && content.aiPersonalization) {
        const preference = profile.preferences[0];
        
        switch (preference) {
          case 'action':
            personalized.thumbnail = content.aiPersonalization.actionFans?.thumbnail || content.thumbnail;
            personalized.hero = content.aiPersonalization.actionFans?.hero || content.hero;
            personalized.accentColor = '#ef4444';
            break;
          case 'romance':
            personalized.thumbnail = content.aiPersonalization.romanceFans?.thumbnail || content.thumbnail;
            personalized.hero = content.aiPersonalization.romanceFans?.hero || content.hero;
            personalized.accentColor = '#ec4899';
            break;
          case 'sci-fi':
            personalized.thumbnail = content.aiPersonalization.scifiFans?.thumbnail || content.thumbnail;
            personalized.hero = content.aiPersonalization.scifiFans?.hero || content.hero;
            personalized.accentColor = '#3b82f6';
            break;
          default:
            personalized.accentColor = '#e50914';
        }
      }
      
      // AI-generated personalized description
      personalized.personalizedDescription = generatePersonalizedDescription(content, profile);
      
      // Predictive engagement score
      personalized.engagementScore = calculateEngagementScore(content, profile);
      
      setPersonalizedContent(personalized);
      setIsAnalyzing(false);
      
      if (onVisualChange) {
        onVisualChange(personalized);
      }
    }, 1000);
  };

  // Generate personalized descriptions
  const generatePersonalizedDescription = (content, profile) => {
    const descriptions = {
      actionFan: `Experience the adrenaline-pumping action in ${content.title}. Perfect for viewers who love high-octane thrills and intense sequences.`,
      romanceFan: `Fall in love with the emotional journey in ${content.title}. A heartwarming story that will touch your soul.`,
      scifiFan: `Explore the fascinating world of ${content.title}. A thought-provoking narrative that pushes the boundaries of imagination.`,
      comedyFan: `Get ready to laugh with ${content.title}. Hilarious moments and witty dialogue that will keep you entertained.`
    };
    
    return descriptions[profile.preferences[0]] || content.description;
  };

  // Calculate engagement prediction
  const calculateEngagementScore = (content, profile) => {
    let score = 0.5; // Base score
    
    // Boost score based on genre preferences
    profile.preferences.forEach(pref => {
      if (content.genre.some(g => g.toLowerCase().includes(pref.toLowerCase()))) {
        score += 0.2;
      }
    });
    
    // Boost based on mood alignment
    if (content.mood) {
      profile.preferences.forEach(pref => {
        if (content.mood.some(m => m.includes(pref))) {
          score += 0.1;
        }
      });
    }
    
    // Boost based on rating
    score += (content.rating / 10) * 0.2;
    
    return Math.min(score, 0.95);
  };

  // A/B testing simulation
  const runABTest = (variantA, variantB) => {
    const testResults = {
      variantA: {
        clicks: Math.floor(Math.random() * 100) + 50,
        conversions: Math.floor(Math.random() * 20) + 10,
        ctr: 0
      },
      variantB: {
        clicks: Math.floor(Math.random() * 100) + 50,
        conversions: Math.floor(Math.random() * 20) + 10,
        ctr: 0
      }
    };
    
    testResults.variantA.ctr = testResults.variantA.conversions / testResults.variantA.clicks;
    testResults.variantB.ctr = testResults.variantB.conversions / testResults.variantB.clicks;
    
    setAbTestResults(testResults);
  };

  // Track user engagement
  const trackEngagement = (action) => {
    setEngagementMetrics(prev => ({
      ...prev,
      [action]: prev[action] + 1
    }));
  };

  // Handle profile change
  const handleProfileChange = (profile) => {
    setCurrentProfile(profile);
    personalizeContent(content, profile);
  };

  // Initialize with default profile
  useEffect(() => {
    if (content) {
      personalizeContent(content, currentProfile);
    }
  }, [content]);

  // Run A/B test when content changes
  useEffect(() => {
    if (content) {
      runABTest('original', 'personalized');
    }
  }, [content]);

  if (!content || !personalizedContent.thumbnail) {
    return (
      <div className="dynamic-visuals-loading">
        <Brain className="analyzing" size={24} />
        <p>AI is personalizing your experience...</p>
      </div>
    );
  }

  return (
    <div className="dynamic-visuals-container">
      {/* AI Personalization Header */}
      <div className="personalization-header">
        <div className="personalization-title">
          <Brain size={20} />
          <h3>AI-Powered Personalization</h3>
        </div>
        
        <div className="profile-selector">
          <span>Viewing as:</span>
          <select
            value={currentProfile.preferences[0]}
            onChange={(e) => {
              const profileKey = e.target.value + 'Fan';
              handleProfileChange(userProfiles[profileKey]);
            }}
            className="profile-select"
          >
            <option value="action">Action Fan</option>
            <option value="romance">Romance Fan</option>
            <option value="scifi">Sci-Fi Fan</option>
            <option value="comedy">Comedy Fan</option>
          </select>
        </div>
      </div>

      {/* Personalized Content Display */}
      <motion.div
        key={currentProfile.preferences[0]}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="personalized-content"
      >
        {/* Dynamic Hero Banner */}
        <div className="dynamic-hero">
          <div className="hero-image-container">
            <img 
              src={personalizedContent.hero} 
              alt={personalizedContent.title}
              className="hero-image"
            />
            <div 
              className="hero-overlay"
              style={{ 
                background: `linear-gradient(135deg, ${personalizedContent.accentColor || '#e50914'}22 0%, transparent 100%)` 
              }}
            />
            
            {/* AI Analysis Badge */}
            <div className="ai-analysis-badge">
              <Brain size={14} />
              <span>AI Optimized</span>
            </div>
          </div>
          
          <div className="hero-content">
            <h1 className="hero-title">{personalizedContent.title}</h1>
            <p className="hero-description">
              {personalizedContent.personalizedDescription}
            </p>
            
            <div className="hero-metadata">
              <div className="metadata-item">
                <Star size={16} />
                <span>{personalizedContent.rating}</span>
              </div>
              <div className="metadata-item">
                <Film size={16} />
                <span>{personalizedContent.genre[0]}</span>
              </div>
              <div className="metadata-item">
                <Target size={16} />
                <span>{Math.round(personalizedContent.engagementScore * 100)}% Match</span>
              </div>
            </div>
            
            <div className="hero-actions">
              <button 
                className="hero-play-btn"
                onClick={() => trackEngagement('conversions')}
                style={{ backgroundColor: personalizedContent.accentColor || '#e50914' }}
              >
                <Zap size={20} />
                Play Now
              </button>
              <button 
                className="hero-info-btn"
                onClick={() => trackEngagement('clicks')}
              >
                <Eye size={20} />
                More Info
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Thumbnails Grid */}
        <div className="dynamic-thumbnails">
          <h4>Personalized Thumbnails</h4>
          <div className="thumbnails-grid">
            {[
              { key: 'action', label: 'Action Focus' },
              { key: 'romance', label: 'Romance Focus' },
              { key: 'scifi', label: 'Sci-Fi Focus' },
              { key: 'comedy', label: 'Comedy Focus' }
            ].map((variant) => (
              <motion.div
                key={variant.key}
                className="thumbnail-variant"
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  const profileKey = variant.key + 'Fan';
                  handleProfileChange(userProfiles[profileKey]);
                }}
              >
                <div className="thumbnail-container">
                  <img 
                    src={`https://picsum.photos/seed/${content.id}-${variant.key}/200/300`} 
                    alt={variant.label}
                  />
                  <div className="thumbnail-overlay">
                    <Palette size={16} />
                    <span>{variant.label}</span>
                  </div>
                </div>
                <div className="thumbnail-metrics">
                  <div className="metric">
                    <TrendingUp size={12} />
                    <span>{Math.round(Math.random() * 30 + 70)}% CTR</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* A/B Test Results */}
        {abTestResults.variantA && (
          <div className="ab-test-results">
            <h4>A/B Test Performance</h4>
            <div className="test-comparison">
              <div className="test-variant">
                <h5>Original</h5>
                <div className="metrics">
                  <div className="metric">
                    <span>Clicks:</span>
                    <span>{abTestResults.variantA.clicks}</span>
                  </div>
                  <div className="metric">
                    <span>Conversions:</span>
                    <span>{abTestResults.variantA.conversions}</span>
                  </div>
                  <div className="metric">
                    <span>CTR:</span>
                    <span>{(abTestResults.variantA.ctr * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="test-variant winner">
                <div className="winner-badge">
                  <Sparkles size={12} />
                  Winner
                </div>
                <h5>AI Personalized</h5>
                <div className="metrics">
                  <div className="metric">
                    <span>Clicks:</span>
                    <span>{abTestResults.variantB.clicks}</span>
                  </div>
                  <div className="metric">
                    <span>Conversions:</span>
                    <span>{abTestResults.variantB.conversions}</span>
                  </div>
                  <div className="metric">
                    <span>CTR:</span>
                    <span>{(abTestResults.variantB.ctr * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Engagement Metrics */}
        <div className="engagement-metrics">
          <h4>Real-time Engagement</h4>
          <div className="metrics-grid">
            <div className="metric-card">
              <Eye size={20} />
              <div className="metric-info">
                <span className="metric-value">{engagementMetrics.clicks}</span>
                <span className="metric-label">Clicks</span>
              </div>
            </div>
            <div className="metric-card">
              <Heart size={20} />
              <div className="metric-info">
                <span className="metric-value">{engagementMetrics.hoverTime}</span>
                <span className="metric-label">Hover Time</span>
              </div>
            </div>
            <div className="metric-card">
              <Zap size={20} />
              <div className="metric-info">
                <span className="metric-value">{engagementMetrics.conversions}</span>
                <span className="metric-label">Conversions</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Processing Indicator */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ai-processing-overlay"
          >
            <Brain className="analyzing" size={24} />
            <span>AI is optimizing visuals for your preferences...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DynamicVisuals;
