import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Wifi, Activity, Clock, TrendingUp, HardDrive, Download, CheckCircle, XCircle, Zap, Check, AlertCircle, X } from 'lucide-react';
import { movieDatabase } from '../data/movieDatabase';
import '../styles/components.css';

const PredictiveCache = ({ userBehavior, currentContent, onCacheUpdate }) => {
  const [cacheStatus, setCacheStatus] = useState({
    total: 0,
    cached: 0,
    downloading: 0,
    priority: []
  });
  const [predictions, setPredictions] = useState([]);
  const [cacheMetrics, setCacheMetrics] = useState({
    hitRate: 0,
    latency: 0,
    bandwidth: 0,
    storage: 0
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cacheEvents, setCacheEvents] = useState([]);

  // AI Predictive Analysis
  const analyzeUserBehavior = (behavior) => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const predictions = generatePredictions(behavior);
      setPredictions(predictions);
      
      // Start caching based on predictions
      predictions.forEach((prediction, index) => {
        setTimeout(() => {
          startCaching(prediction.content, prediction.probability);
        }, index * 500);
      });
      
      setIsAnalyzing(false);
    }, 1000);
  };

  // Generate AI predictions
  const generatePredictions = (behavior) => {
    const allContent = [
      ...movieDatabase.trending,
      ...movieDatabase.comedy,
      ...movieDatabase.drama,
      ...movieDatabase.action,
      ...movieDatabase.documentaries,
      ...movieDatabase.tvShows
    ];
    
    // Simulate ML model predictions
    const predictions = allContent
      .map(content => ({
        content,
        probability: Math.random() * 0.9 + 0.1, // 0.1 to 1.0
        reason: generatePredictionReason(content, behavior),
        estimatedTime: Math.floor(Math.random() * 300) + 60 // 1-5 minutes
      }))
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 8);
    
    return predictions;
  };

  // Generate prediction reasons
  const generatePredictionReason = (content, behavior) => {
    const reasons = [
      `Similar to ${behavior?.lastWatched || 'recently watched content'}`,
      `Trending in your region`,
      `Matches your viewing preferences`,
      `Popular with similar users`,
      `Partially watched previously`,
      `High engagement expected`,
      `Recommended based on watch history`,
      `Sequel to recently watched content`
    ];
    
    return reasons[Math.floor(Math.random() * reasons.length)];
  };

  // Start caching content
  const startCaching = (content, probability) => {
    const cacheEvent = {
      id: Date.now() + Math.random(),
      content: content.title,
      type: 'start',
      probability,
      timestamp: new Date(),
      size: Math.floor(Math.random() * 500) + 200 // 200-700 MB
    };
    
    setCacheEvents(prev => [cacheEvent, ...prev.slice(0, 9)]);
    setCacheStatus(prev => ({
      ...prev,
      downloading: prev.downloading + 1,
      total: prev.total + 1
    }));
    
    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      
      if (progress >= 100) {
        clearInterval(interval);
        
        const completeEvent = {
          ...cacheEvent,
          type: 'complete',
          timestamp: new Date()
        };
        
        setCacheEvents(prev => [completeEvent, ...prev.slice(0, 9)]);
        setCacheStatus(prev => ({
          ...prev,
          downloading: prev.downloading - 1,
          cached: prev.cached + 1
        }));
        
        // Update metrics
        updateCacheMetrics();
        
        if (onCacheUpdate) {
          onCacheUpdate(content, 'cached');
        }
      }
    }, 200);
  };

  // Update cache metrics
  const updateCacheMetrics = () => {
    setCacheMetrics({
      hitRate: Math.random() * 30 + 70, // 70-100%
      latency: Math.random() * 50 + 50, // 50-100ms
      bandwidth: Math.floor(Math.random() * 50) + 10, // 10-60 Mbps
      storage: Math.floor(Math.random() * 2000) + 1000 // 1-3 GB
    });
  };

  // Simulate cache hits
  const simulateCacheHit = () => {
    if (predictions.length > 0) {
      const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
      const hitEvent = {
        id: Date.now() + Math.random(),
        content: randomPrediction.content.title,
        type: 'hit',
        timestamp: new Date(),
        latency: Math.floor(Math.random() * 50) + 10 // 10-60ms
      };
      
      setCacheEvents(prev => [hitEvent, ...prev.slice(0, 9)]);
      
      if (window.showNotification) {
        window.showNotification(
          'success', 
          `⚡ Instant play: ${randomPrediction.content.title} (from cache)`, 
          2000,
          'Cache Hit'
        );
      }
    }
  };

  // Initialize with user behavior analysis
  useEffect(() => {
    if (userBehavior) {
      analyzeUserBehavior(userBehavior);
    }
    
    // Update metrics periodically
    const metricsInterval = setInterval(updateCacheMetrics, 3000);
    
    return () => clearInterval(metricsInterval);
  }, [userBehavior]);

  // Simulate AI analysis
  useEffect(() => {
    const analysisInterval = setInterval(() => {
      setIsAnalyzing(true);
      setTimeout(() => {
        generatePredictions();
        setIsAnalyzing(false);
      }, 1500); // Reduced from 3000ms to 1500ms
    }, 20000); // Increased interval to 20 seconds
    
    return () => clearInterval(analysisInterval);
  }, [userBehavior, currentContent]);

  // Auto-simulate cache hits
  useEffect(() => {
    const hitInterval = setInterval(() => {
      if (Math.random() > 0.7 && cacheStatus.cached > 0) {
        simulateCacheHit();
      }
    }, 5000);
    
    return () => clearInterval(hitInterval);
  }, [cacheStatus.cached, predictions]);

  const [isExpanded, setIsExpanded] = useState(false);
  const [autoCollapseTimer, setAutoCollapseTimer] = useState(null);
  const [countdown, setCountdown] = useState(10);

  // Auto-collapse after 10 seconds with countdown
  useEffect(() => {
    if (isExpanded) {
      setCountdown(10);
      
      const timer = setTimeout(() => {
        setIsExpanded(false);
        setCountdown(10);
      }, 10000);
      
      setAutoCollapseTimer(timer);
      
      // Countdown timer
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        clearTimeout(timer);
        clearInterval(countdownInterval);
        setAutoCollapseTimer(null);
        setCountdown(10);
      };
    }
  }, [isExpanded]);

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (autoCollapseTimer) {
        clearTimeout(autoCollapseTimer);
      }
    };
  }, [autoCollapseTimer]);

  return (
    <div className="predictive-cache-container">
      {/* Cache Status Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`cache-status-button ${isExpanded ? 'active' : ''}`}
      >
        <div className="cache-indicator">
          {isAnalyzing ? (
            <Brain className="analyzing" size={16} />
          ) : (
            <Wifi size={16} />
          )}
          <span className="cache-text">
            {isAnalyzing ? 'AI Learning' : `${cacheMetrics.hitRate.toFixed(0)}% Hit Rate`}
          </span>
          <Zap size={14} />
        </div>
      </button>

      {/* Expanded Cache Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="cache-expanded-panel"
          >
            {/* Cache Status Header */}
            <div className="cache-header">
              <div className="header-title">
                <Brain size={20} />
                <h3>AI Predictive Cache</h3>
              </div>
              <div className="header-controls">
                <div className="countdown-indicator">
                  <Clock size={14} />
                  <span>{countdown}s</span>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="close-panel-btn"
                  title="Close panel"
                >
                  <X size={16} />
                </button>
                <div className="cache-status-indicator">
                  <Wifi size={16} />
                  <span>Optimizing</span>
                </div>
              </div>
            </div>

            {/* Cache Metrics */}
            <div className="cache-metrics">
              <div className="metric-card">
                <div className="metric-icon">
                  <Activity size={18} />
                </div>
                <div className="metric-info">
                  <span className="metric-value">{cacheMetrics.hitRate.toFixed(1)}%</span>
                  <span className="metric-label">Hit Rate</span>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">
                  <Clock size={18} />
                </div>
                <div className="metric-info">
                  <span className="metric-value">{cacheMetrics.latency}ms</span>
                  <span className="metric-label">Latency</span>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">
                  <TrendingUp size={18} />
                </div>
                <div className="metric-info">
                  <span className="metric-value">{cacheMetrics.bandwidth}Mbps</span>
                  <span className="metric-label">Bandwidth</span>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">
                  <HardDrive size={18} />
                </div>
                <div className="metric-info">
                  <span className="metric-value">{(cacheMetrics.storage / 1024).toFixed(1)}GB</span>
                  <span className="metric-label">Storage</span>
                </div>
              </div>
            </div>

            {/* Cache Progress */}
            <div className="cache-progress">
              <div className="progress-header">
                <span>Cache Utilization</span>
                <span>{cacheStatus.cached}/{cacheStatus.total}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill cached"
                  style={{ width: `${cacheStatus.total > 0 ? (cacheStatus.cached / cacheStatus.total) * 100 : 0}%` }}
                />
                <div 
                  className="progress-fill downloading"
                  style={{ width: `${cacheStatus.total > 0 ? (cacheStatus.downloading / cacheStatus.total) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Predictions */}
            <div className="predictions-section">
              <div className="section-header">
                <Brain size={16} />
                <span>AI Predictions</span>
              </div>
              <div className="predictions-list">
                {predictions.slice(0, 4).map((prediction, index) => (
                  <motion.div
                    key={prediction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="prediction-item"
                  >
                    <div className="prediction-thumbnail">
                      <img src={prediction.thumbnail} alt={prediction.title} />
                    </div>
                    <div className="prediction-info">
                      <div className="prediction-title">{prediction.title}</div>
                      <div className="prediction-confidence">
                        <span>{(prediction.confidence * 100).toFixed(0)}% match</span>
                      </div>
                    </div>
                    <div className="prediction-status">
                      <span className={`status-badge ${prediction.status}`}>
                        {prediction.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Live Events */}
            <div className="live-events-section">
              <div className="section-header">
                <Activity size={16} />
                <span>Live Cache Events</span>
              </div>
              <div className="events-list">
                {cacheEvents.slice(0, 3).map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="event-item"
                  >
                    <div className="event-icon">
                      {event.type === 'hit' && <CheckCircle size={14} />}
                      {event.type === 'miss' && <XCircle size={14} />}
                      {event.type === 'download' && <Download size={14} />}
                    </div>
                    <div className="event-content">
                      <span className="event-title">{event.title}</span>
                      <span className="event-time">{event.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AI Processing Overlay */}
            <AnimatePresence>
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="ai-processing-overlay"
                >
                  <Brain className="analyzing" size={24} />
                  <span>AI is predicting your next moves...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PredictiveCache;
