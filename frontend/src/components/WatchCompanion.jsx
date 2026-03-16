import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Eye, ShoppingBag, Info, Clock, X, Send, Mic, Camera, Book, Users, Zap } from 'lucide-react';
import '../styles/components.css';

const WatchCompanion = ({ videoData, currentTime, onInteraction }) => {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [showShoppable, setShowShoppable] = useState(false);
  const [characterInfo, setCharacterInfo] = useState({});
  const [plotHistory, setPlotHistory] = useState([]);
  const messagesEndRef = useRef(null);

  // AI Computer Vision - Object Detection
  const detectSceneObjects = () => {
    // Simulate AI object detection in current scene
    const objects = [
      {
        id: 1,
        name: "Vintage Leather Jacket",
        category: "clothing",
        price: "$299",
        confidence: 0.95,
        position: { x: 45, y: 30 },
        shopUrl: "https://example.com/jacket"
      },
      {
        id: 2,
        name: "Oak Sunglasses",
        category: "accessories",
        price: "$189",
        confidence: 0.88,
        position: { x: 50, y: 25 },
        shopUrl: "https://example.com/sunglasses"
      },
      {
        id: 3,
        name: "Smart Watch",
        category: "electronics",
        price: "$449",
        confidence: 0.92,
        position: { x: 48, y: 40 },
        shopUrl: "https://example.com/watch"
      }
    ];
    
    setDetectedObjects(objects);
  };

  // AI Character Recognition
  const recognizeCharacter = (actorName) => {
    const characterDatabase = {
      "Chris Evans": {
        character: "Captain Steve Rogers",
        background: "Super soldier turned leader of the Avengers. Enhanced strength, agility, and tactical genius.",
        previousAppearances: ["The Avengers", "Winter Soldier", "Civil War"],
        actorInfo: "Chris Evans is known for his portrayal of Captain America in the Marvel Cinematic Universe."
      },
      "Zendaya": {
        character: "MJ Watson",
        background: "Brilliant student and Peter Parker's love interest. Known for her sharp wit and observational skills.",
        previousAppearances: ["Spider-Man: Homecoming", "Far From Home", "No Way Home"],
        actorInfo: "Zendaya rose to fame in Disney Channel's Shake It Up before becoming a global superstar."
      },
      "Ryan Gosling": {
        character: "Detective K",
        background: "Cyberpunk detective with enhanced cybernetic implants. Specializes in neural hacking and data extraction.",
        previousAppearances: ["Neon Shadows: Origins", "Digital Dreams"],
        actorInfo: "Ryan Gosling is known for his roles in Drive, La La Land, and Blade Runner 2049."
      }
    };
    
    return characterDatabase[actorName] || {
      character: "Unknown Character",
      background: "Character information not available.",
      previousAppearances: [],
      actorInfo: "Actor information not available."
    };
  };

  // AI Plot Analysis
  const analyzePlotContext = (currentTime) => {
    const plotContexts = [
      {
        timestamp: 600, // 10 minutes
        context: "The protagonist discovers the first clue about the conspiracy. This sets up the main conflict.",
        importantDetails: ["Note the red symbol on the document", "The background music changes tempo", "Character's microexpression"]
      },
      {
        timestamp: 1800, // 30 minutes
        context: "First major confrontation. The stakes are raised as the antagonist reveals their true motives.",
        importantDetails: ["Lighting becomes more dramatic", "Camera angles shift to emphasize power dynamics", "Dialogue contains key foreshadowing"]
      },
      {
        timestamp: 3600, // 60 minutes
        context: "Midpoint twist - nothing is as it seems. The protagonist's worldview is challenged.",
        importantDetails: ["Color palette changes significantly", "Mirrors and reflections become prominent", "Sound design includes subtle cues"]
      }
    ];
    
    const relevantContext = plotContexts.find(ctx => 
      Math.abs(ctx.timestamp - currentTime) < 300 // Within 5 minutes
    );
    
    if (relevantContext) {
      setPlotHistory(prev => [relevantContext, ...prev.slice(0, 2)]);
    }
  };

  // AI Query Processing
  const processQuery = async (userQuery) => {
    const lowerQuery = userQuery.toLowerCase();
    let response = { type: 'general', content: '' };
    
    // Actor identification
    if (lowerQuery.includes('who is') || lowerQuery.includes('actor')) {
      const actors = ["Chris Evans", "Zendaya", "Ryan Gosling", "Ana de Armas"];
      const mentionedActor = actors.find(actor => 
        lowerQuery.includes(actor.toLowerCase())
      );
      
      if (mentionedActor) {
        const charInfo = recognizeCharacter(mentionedActor);
        response = {
          type: 'character',
          content: charInfo,
          timestamp: new Date()
        };
      }
    }
    
    // Object/Shopping queries
    else if (lowerQuery.includes('buy') || lowerQuery.includes('shop') || lowerQuery.includes('where can i')) {
      response = {
        type: 'shoppable',
        content: detectedObjects.slice(0, 3),
        timestamp: new Date()
      };
      setShowShoppable(true);
    }
    
    // Plot questions
    else if (lowerQuery.includes('what happened') || lowerQuery.includes('remind me') || lowerQuery.includes('season 1')) {
      response = {
        type: 'plot',
        content: plotHistory[0] || { context: "Plot analysis in progress..." },
        timestamp: new Date()
      };
    }
    
    // General information
    else if (lowerQuery.includes('what is this') || lowerQuery.includes('explain')) {
      response = {
        type: 'info',
        content: videoData?.description || "Scene analysis in progress...",
        timestamp: new Date()
      };
    }
    
    // Default AI response
    else {
      const aiResponses = [
        "Based on the current scene, this appears to be a pivotal moment in the character's journey.",
        "The cinematography here uses specific techniques to convey emotional depth.",
        "This scene contains subtle foreshadowing of events to come.",
        "The musical score shifts here to emphasize the dramatic tension.",
        "Notice the color palette change - it signifies a shift in tone."
      ];
      
      response = {
        type: 'ai_insight',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date()
      };
    }
    
    setResponses(prev => [...prev, response]);
    
    if (onInteraction) {
      onInteraction(response);
    }
  };

  // Voice input simulation
  const startVoiceInput = () => {
    setIsListening(true);
    
    setTimeout(() => {
      const sampleQueries = [
        "Who is that actor?",
        "Where can I buy that jacket?",
        "What happened in Season 1 to this character?",
        "What is this scene about?",
        "Remind me what happened earlier"
      ];
      
      const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setQuery(randomQuery);
      setIsListening(false);
      processQuery(randomQuery);
    }, 2000);
  };

  // Handle query submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      processQuery(query);
      setQuery('');
    }
  };

  // Analyze current scene
  useEffect(() => {
    if (isActive && videoData) {
      detectSceneObjects();
      analyzePlotContext(currentTime);
    }
  }, [currentTime, isActive, videoData]);

  // Auto-scroll to latest response
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [responses]);

  return (
    <div className="watch-companion-container">
      {/* Toggle Button */}
      <button
        onClick={() => setIsActive(!isActive)}
        className={`companion-toggle ${isActive ? 'active' : ''}`}
      >
        <Brain size={20} />
        <span>AI Companion</span>
      </button>

      {/* Companion Panel */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="companion-panel"
          >
            {/* Header */}
            <div className="companion-header">
              <div className="header-title">
                <Brain size={20} />
                <h3>AI Watch Companion</h3>
              </div>
              <button
                onClick={() => setIsActive(false)}
                className="close-companion"
              >
                <X size={18} />
              </button>
            </div>

            {/* Detected Objects */}
            {detectedObjects.length > 0 && (
              <div className="detected-objects">
                <div className="section-header">
                  <Camera size={16} />
                  <span>Detected Objects</span>
                </div>
                <div className="objects-grid">
                  {detectedObjects.map((obj) => (
                    <div
                      key={obj.id}
                      className="object-item"
                      onClick={() => setShowShoppable(true)}
                    >
                      <div className="object-info">
                        <span className="object-name">{obj.name}</span>
                        <span className="object-price">{obj.price}</span>
                      </div>
                      <div className="object-confidence">
                        {Math.round(obj.confidence * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Responses */}
            <div className="companion-responses">
              {responses.length === 0 && (
                <div className="welcome-message">
                  <Brain size={24} />
                  <p>Ask me anything about the scene!</p>
                  <ul>
                    <li>"Who is that actor?"</li>
                    <li>"Where can I buy that jacket?"</li>
                    <li>"What happened earlier?"</li>
                  </ul>
                </div>
              )}
              
              {responses.map((response, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`response-item ${response.type}`}
                >
                  {response.type === 'character' && (
                    <div className="character-response">
                      <Users size={16} />
                      <div className="character-info">
                        <h4>{response.content.character}</h4>
                        <p>{response.content.background}</p>
                        <div className="character-details">
                          <span><strong>Actor:</strong> {response.content.actorInfo}</span>
                          <span><strong>Previous:</strong> {response.content.previousAppearances.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {response.type === 'shoppable' && (
                    <div className="shoppable-response">
                      <ShoppingBag size={16} />
                      <div className="shoppable-items">
                        <h4>Shop the Look</h4>
                        {response.content.map((item) => (
                          <div key={item.id} className="shop-item">
                            <span>{item.name}</span>
                            <span>{item.price}</span>
                            <button 
                              onClick={() => {
                                if (window.showNotification) {
                                  window.showNotification('info', `🛍️ Opening shop for ${item.name}...`, 2000);
                                }
                              }}
                            >
                              Shop Now
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {response.type === 'plot' && (
                    <div className="plot-response">
                      <Book size={16} />
                      <div className="plot-info">
                        <h4>Plot Context</h4>
                        <p>{response.content.context}</p>
                        {response.content.importantDetails && (
                          <ul>
                            {response.content.importantDetails.map((detail, i) => (
                              <li key={i}>{detail}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {response.type === 'ai_insight' && (
                    <div className="ai-response">
                      <Zap size={16} />
                      <p>{response.content}</p>
                    </div>
                  )}
                  
                  {response.type === 'info' && (
                    <div className="info-response">
                      <Info size={16} />
                      <p>{response.content}</p>
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="companion-input">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask about the scene..."
                  className="companion-query"
                />
                <div className="input-actions">
                  <button
                    type="button"
                    onClick={startVoiceInput}
                    className={`voice-btn ${isListening ? 'listening' : ''}`}
                  >
                    <Mic size={16} />
                  </button>
                  <button type="submit" className="send-btn">
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Actions */}
            <div className="quick-actions">
              <button
                onClick={() => processQuery("Who is that actor?")}
                className="quick-action"
              >
                <Users size={14} />
                Cast Info
              </button>
              <button
                onClick={() => processQuery("Where can I buy that jacket?")}
                className="quick-action"
              >
                <ShoppingBag size={14} />
                Shop Look
              </button>
              <button
                onClick={() => processQuery("What happened earlier?")}
                className="quick-action"
              >
                <Book size={14} />
                Plot Recap
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WatchCompanion;
