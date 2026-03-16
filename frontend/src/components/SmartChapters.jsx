import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Clock, Eye, Zap, Brain, ChevronRight, X, Volume2, Settings } from 'lucide-react';
import '../styles/components.css';

const SmartChapters = ({ videoData, currentTime, onChapterChange, onHighlightReel }) => {
  const [currentChapter, setCurrentChapter] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [transcriptText, setTranscriptText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [highlightReel, setHighlightReel] = useState([]);
  const [watchProgress, setWatchProgress] = useState(0);

  // AI Chapter Analysis
  const analyzeCurrentScene = () => {
    if (!videoData?.scenes?.chapters) return;
    
    const chapters = videoData.scenes.chapters;
    const currentChapterIndex = chapters.findIndex(chapter => {
      const [startMin, startSec] = chapter.timestamp.split(':').map(Number);
      const chapterStart = startMin * 60 + startSec;
      const nextChapter = chapters[chapters.indexOf(chapter) + 1];
      
      if (nextChapter) {
        const [nextMin, nextSec] = nextChapter.timestamp.split(':').map(Number);
        const chapterEnd = nextMin * 60 + nextSec;
        return currentTime >= chapterStart && currentTime < chapterEnd;
      } else {
        return currentTime >= chapterStart;
      }
    });
    
    if (currentChapterIndex !== -1 && currentChapterIndex !== currentChapter) {
      setCurrentChapter(currentChapterIndex);
      
      // Generate AI transcript for current scene
      generateSceneTranscript(chapters[currentChapterIndex]);
    }
  };

  // AI-powered transcript generation
  const generateSceneTranscript = (chapter) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const transcripts = {
        "The Discovery": "Scientists are gathered around monitors as the first signal from deep space appears on screen. The lead scientist adjusts parameters, her hands trembling slightly. 'This can't be right,' she whispers, but the data is undeniable.",
        "First Contact": "The alien vessel materializes silently above Earth. Communications officers work frantically as the first message translates: 'We come in peace. We have been watching.' The world holds its breath.",
        "The Journey": "The crew boards the starship, each carrying personal mementos from Earth. The captain gives the final order: 'Engage.' As the ship lifts off, Earth grows smaller behind them.",
        "Revelation": "In the alien chamber, the truth is revealed. They are not visitors, but observers. Humanity has been part of an experiment all along. The question is: what happens now?"
      };
      
      setTranscriptText(transcripts[chapter.title] || "Scene analysis in progress...");
      setIsAnalyzing(false);
    }, 1500);
  };

  // Generate highlight reel
  const generateHighlightReel = () => {
    if (!videoData?.scenes?.highlights) return;
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const highlights = videoData.scenes.highlights.map((highlight, index) => ({
        id: index,
        timestamp: highlight,
        title: `Highlight ${index + 1}`,
        description: `Key moment from ${highlight}`,
        thumbnail: `https://picsum.photos/seed/highlight-${index}/320/180`
      }));
      
      setHighlightReel(highlights);
      setIsAnalyzing(false);
      
      if (onHighlightReel) {
        onHighlightReel(highlights);
      }
    }, 2000);
  };

  // Format time for display
  const formatTime = (timestamp) => {
    const [min, sec] = timestamp.split(':').map(Number);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  // Jump to chapter
  const jumpToChapter = (chapterIndex) => {
    const chapter = videoData.scenes.chapters[chapterIndex];
    if (chapter && onChapterChange) {
      const [min, sec] = chapter.timestamp.split(':').map(Number);
      const timeInSeconds = min * 60 + sec;
      onChapterChange(timeInSeconds);
    }
  };

  // Update current chapter based on time
  useEffect(() => {
    analyzeCurrentScene();
  }, [currentTime]);

  // Calculate watch progress
  useEffect(() => {
    if (videoData?.duration) {
      const [min, sec] = videoData.duration.split('h')[1]?.split('min')[0]?.split(' ') || [0];
      const totalMinutes = parseInt(min) || 120;
      const progress = (currentTime / (totalMinutes * 60)) * 100;
      setWatchProgress(Math.min(progress, 100));
    }
  }, [currentTime, videoData]);

  if (!videoData?.scenes?.chapters) {
    return (
      <div className="smart-chapters-empty">
        <Brain size={24} />
        <p>AI chapters will be available soon</p>
      </div>
    );
  }

  return (
    <div className="smart-chapters-container">
      {/* Current Chapter Display */}
      <AnimatePresence>
        {currentChapter !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="current-chapter-display"
          >
            <div className="chapter-header">
              <div className="chapter-icon">
                <Brain size={16} />
              </div>
              <div className="chapter-info">
                <h4>Current Scene</h4>
                <h3>{videoData.scenes.chapters[currentChapter].title}</h3>
                <p>{videoData.scenes.chapters[currentChapter].description}</p>
              </div>
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="transcript-toggle"
              >
                <Eye size={16} />
                Transcript
              </button>
            </div>
            
            {/* AI Transcript */}
            <AnimatePresence>
              {showTranscript && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ai-transcript"
                >
                  <div className="transcript-header">
                    <Brain size={14} />
                    <span>AI-Generated Transcript</span>
                    {isAnalyzing && <div className="analyzing-indicator" />}
                  </div>
                  <p className="transcript-text">
                    {isAnalyzing ? 'Analyzing scene...' : transcriptText}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter Navigation */}
      <div className="chapters-navigation">
        <div className="chapters-header">
          <h4>Smart Chapters</h4>
          <button
            onClick={generateHighlightReel}
            className="highlight-reel-btn"
            disabled={isAnalyzing}
          >
            <Zap size={16} />
            {isAnalyzing ? 'Generating...' : 'Highlight Reel'}
          </button>
        </div>
        
        <div className="chapters-list">
          {videoData.scenes.chapters.map((chapter, index) => (
            <motion.div
              key={index}
              className={`chapter-item ${currentChapter === index ? 'active' : ''}`}
              onClick={() => jumpToChapter(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="chapter-thumbnail">
                <img 
                  src={`https://picsum.photos/seed/chapter-${index}/120/68`} 
                  alt={chapter.title}
                />
                <div className="chapter-overlay">
                  <Play size={16} />
                </div>
              </div>
              
              <div className="chapter-content">
                <div className="chapter-title-row">
                  <h5>{chapter.title}</h5>
                  <span className="chapter-time">{formatTime(chapter.timestamp)}</span>
                </div>
                <p className="chapter-description">{chapter.description}</p>
              </div>
              
              <div className="chapter-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: currentChapter === index ? `${watchProgress}%` : '0%' 
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Highlight Reel */}
      <AnimatePresence>
        {highlightReel.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="highlight-reel-section"
          >
            <div className="highlight-reel-header">
              <Zap size={16} />
              <h4>AI-Generated Highlights</h4>
              <button
                onClick={() => setHighlightReel([])}
                className="close-reel"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="highlights-grid">
              {highlightReel.map((highlight) => (
                <div
                  key={highlight.id}
                  className="highlight-item"
                  onClick={() => {
                    const [min, sec] = highlight.timestamp.split('-')[0].split(':').map(Number);
                    const timeInSeconds = min * 60 + sec;
                    if (onChapterChange) onChapterChange(timeInSeconds);
                  }}
                >
                  <div className="highlight-thumbnail">
                    <img src={highlight.thumbnail} alt={highlight.title} />
                    <div className="highlight-overlay">
                      <Play size={20} />
                    </div>
                  </div>
                  <div className="highlight-info">
                    <p>{highlight.title}</p>
                    <span>{highlight.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Playback Controls */}
      <div className="smart-playback-controls">
        <div className="controls-row">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="play-control-btn"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <div className="time-display">
            <Clock size={16} />
            <span>{formatTime(videoData.scenes.chapters[0]?.timestamp || '00:00')}</span>
          </div>
          
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${watchProgress}%` }}
              />
            </div>
          </div>
          
          <div className="time-display">
            <span>{videoData.duration}</span>
          </div>
        </div>
        
        <div className="controls-row">
          <button className="control-btn">
            <SkipBack size={18} />
          </button>
          <button className="control-btn">
            <SkipForward size={18} />
          </button>
          <button className="control-btn">
            <Volume2 size={18} />
          </button>
          <button className="control-btn">
            <Settings size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartChapters;
