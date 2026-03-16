import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Import Netflix Clean Pages
import NetflixHomeClean from './pages/NetflixHomeClean';
import NetflixWatch from './pages/NetflixWatch';
import NetflixAuth from './pages/NetflixAuth';
import TVShowsClean from './pages/TVShowsClean';
import MoviesClean from './pages/MoviesClean';
import NewPopularClean from './pages/NewPopularClean';
import MyListClean from './pages/MyListClean';
import ProfileClean from './pages/ProfileClean';
import MovieDetail from './pages/MovieDetail';

// Import Components
import NotificationSystem from './components/NotificationSystem';
import AISearch from './components/AISearch';
import SmartChapters from './components/SmartChapters';
import DynamicVisuals from './components/DynamicVisuals';
import WatchCompanion from './components/WatchCompanion';
import PredictiveCache from './components/PredictiveCache';

// Import Netflix Clean Styles
import './styles/netflix-clean.css';
import './styles/components.css';
import './styles/notification-bar.css';
import './styles/profile.css';

function AppNetflixClean() {
  const [userBehavior, setUserBehavior] = useState({
    lastWatched: 'Cosmic Odyssey',
    preferences: ['sci-fi', 'action'],
    watchTime: 120
  });

  const [currentContent, setCurrentContent] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        {/* Global AI Features */}
        <div className="ai-features-global">
          <AISearch 
            onSearch={(results, intent) => {
              console.log('AI Search Results:', results, intent);
              if (window.showNotification) {
                window.showNotification('success', `🧠 Found ${results.length} results with ${Math.round(intent.confidence * 100)}% confidence`, 3000, 'AI Search Complete');
              }
            }}
            onNavigate={(path) => {
              window.location.href = path;
            }}
          />
        </div>

        <Routes>
          <Route path="/" element={<NetflixHomeClean />} />
          <Route path="/tv-shows" element={<TVShowsClean />} />
          <Route path="/movies" element={<MoviesClean />} />
          <Route path="/new-popular" element={<NewPopularClean />} />
          <Route path="/my-list" element={<MyListClean />} />
          <Route path="/profile" element={<ProfileClean />} />
          <Route path="/auth" element={<NetflixAuth />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route 
            path="/watch/:id" 
            element={
              <div className="watch-page-container">
                <NetflixWatch 
                  onContentChange={(content, time) => {
                    setCurrentContent(content);
                    setCurrentTime(time);
                  }}
                />
                
                {/* AI Features for Watch Page */}
                <div className="watch-page-ai-features">
                  <SmartChapters 
                    videoData={currentContent}
                    currentTime={currentTime}
                    onChapterChange={(time) => {
                      console.log('Chapter changed to:', time);
                    }}
                    onHighlightReel={(highlights) => {
                      if (window.showNotification) {
                        window.showNotification('success', `🎬 Generated ${highlights.length} highlights`, 3000, 'AI Highlights Ready');
                      }
                    }}
                  />
                  
                  <WatchCompanion 
                    videoData={currentContent}
                    currentTime={currentTime}
                    onInteraction={(response) => {
                      console.log('AI Companion Response:', response);
                    }}
                  />
                </div>
              </div>
            } 
          />
          
          {/* AI Personalization Page */}
          <Route 
            path="/ai-visuals" 
            element={
              <div className="ai-visuals-page">
                <DynamicVisuals 
                  content={{
                    id: 1,
                    title: "Cosmic Odyssey",
                    description: "A breathtaking journey through space and time...",
                    genre: ["Sci-Fi", "Adventure"],
                    rating: 8.7,
                    duration: "2h 28min",
                    thumbnail: "https://picsum.photos/seed/cosmic-odyssey/300/450",
                    hero: "https://picsum.photos/seed/cosmic-odyssey-hero/1920/1080"
                  }}
                  userProfile={userBehavior}
                  onVisualChange={(personalized) => {
                    console.log('Visuals personalized:', personalized);
                  }}
                />
              </div>
            } 
          />
          
          {/* AI Predictive Cache Page */}
          <Route 
            path="/ai-cache" 
            element={
              <div className="ai-cache-page">
                <PredictiveCache 
                  userBehavior={userBehavior}
                  currentContent={currentContent}
                  onCacheUpdate={(content, status) => {
                    console.log('Cache updated:', content.title, status);
                  }}
                />
              </div>
            } 
          />
        </Routes>
        
        <NotificationSystem />
        
        {/* Global AI Features */}
        <div className="ai-features-sidebar">
          <PredictiveCache 
            userBehavior={userBehavior}
            currentContent={currentContent}
            onCacheUpdate={(content, status) => {
              console.log('Background cache updated:', content.title, status);
            }}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default AppNetflixClean;
