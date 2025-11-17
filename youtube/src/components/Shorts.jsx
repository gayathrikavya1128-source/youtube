import React, { useState, useRef, useEffect } from 'react';
import './Shorts.css';

const Shorts = () => {
  const [currentShortIndex, setCurrentShortIndex] = useState(0);
  const [likes, setLikes] = useState([125000, 320000, 580000, 210000]);
  const [isLiked, setIsLiked] = useState([false, false, false, false]);
  const containerRef = useRef(null);

  // SHORTS DATA - Using working video IDs
  const shorts = [
    {
      id: 1,
      title: "When you try to be cool but fail miserably 😂",
      creator: "FunnyMoments",
      views: "2.5M",
      likes: 125000,
      youtubeId: "dQw4w9WgXcQ", // Always working video
      audio: "Original Sound - FunnyMoments",
      description: "We've all been there! 😅 Don't forget to like and follow for more hilarious content! #funny #fail #comedy #shorts"
    },
    {
      id: 2,
      title: "Magic trick that will blow your mind 🎩✨",
      creator: "MagicMaster",
      views: "5.1M", 
      likes: 320000,
      youtubeId: "9bZkp7q19f0", // Gangnam Style
      audio: "Magical Sound - MagicMaster",
      description: "How did I do this? 🤔 Comment your theories below! #magic #trick #illusion #shorts"
    },
    {
      id: 3,
      title: "5-second cooking hack you'll use everyday 👨‍🍳",
      creator: "QuickKitchen",
      views: "8.7M",
      likes: 580000,
      youtubeId: "kJQP7kiw5Fk", // Despacito
      audio: "Cooking Vibes - QuickKitchen",
      description: "Save this for your next cooking session! 🍳 Which hack was your favorite? #cooking #lifehacks #kitchen #shorts"
    },
    
    {
    id: 2,
    title: "DIY home organization ideas 🏠",
    creator: "HomeHacks",
    views: "3.9M", 
    likes: 220000,
    youtubeId: "5NNOrp_83RU", // DIY organization
    audio: "Calm Vibes - HomeHacks",
    description: "Transform your space with these simple hacks! ✨ #diy #organization #home #shorts"
  },
  //  {
  //   id: 6,
  //   title: "Quick math trick for multiplication 🧮",
  //   creator: "MathGenius",
  //   views: "4.3M",
  //   likes: 310000,
  //   youtubeId: "P3AOoLbA3us", // Math trick
  //   audio: "Educational Music - MathGenius",
  //   description: "Multiply large numbers in seconds! 🤯 Perfect for students. #math #trick #education #shorts"
  // },
  ];

  const currentShort = shorts[currentShortIndex];

  // FIX SWIPE FUNCTIONALITY
  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      if (event.deltaY > 0) {
        // Scroll down - next video
        setCurrentShortIndex(prev => prev === shorts.length - 1 ? 0 : prev + 1);
      } else if (event.deltaY < 0) {
        // Scroll up - previous video
        setCurrentShortIndex(prev => prev === 0 ? shorts.length - 1 : prev - 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [shorts.length]);

  // Touch swipe handlers
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe up - next video
      setCurrentShortIndex(prev => prev === shorts.length - 1 ? 0 : prev + 1);
    } else if (touchEnd - touchStart > 100) {
      // Swipe down - previous video
      setCurrentShortIndex(prev => prev === 0 ? shorts.length - 1 : prev - 1);
    }
  };

  const handleLike = () => {
    const newLikes = [...likes];
    const newIsLiked = [...isLiked];
    
    if (newIsLiked[currentShortIndex]) {
      newLikes[currentShortIndex] -= 1;
    } else {
      newLikes[currentShortIndex] += 1;
    }
    
    newIsLiked[currentShortIndex] = !newIsLiked[currentShortIndex];
    setLikes(newLikes);
    setIsLiked(newIsLiked);
  };

  const nextShort = () => {
    setCurrentShortIndex(prev => prev === shorts.length - 1 ? 0 : prev + 1);
  };

  const prevShort = () => {
    setCurrentShortIndex(prev => prev === 0 ? shorts.length - 1 : prev - 1);
  };

  return (
    <div 
      className="shorts-page"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Single Active Short */}
      <div className="short-video-container active">
        {/* YouTube Shorts Video with Fallback */}
        <div className="youtube-shorts-player">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${currentShort.youtubeId}?playsinline=1`}
            title={currentShort.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Overlay Content */}
        <div className="shorts-overlay">
          {/* Right Side Actions */}
          <div className="shorts-actions-right">
            <div className="action-group">
              <button 
                className={`action-btn ${isLiked[currentShortIndex] ? 'liked' : ''}`}
                onClick={handleLike}
              >
                <div className="action-icon">👍</div>
                <span className="action-count">{likes[currentShortIndex].toLocaleString()}</span>
              </button>

              <button className="action-btn">
                <div className="action-icon">👎</div>
                <span className="action-count">Dislike</span>
              </button>

              <button className="action-btn">
                <div className="action-icon">💬</div>
                <span className="action-count">452</span>
              </button>

              <button className="action-btn">
                <div className="action-icon">🔗</div>
                <span className="action-count">Share</span>
              </button>

              <button className="action-btn">
                <div className="action-icon">⚡</div>
                <span className="action-count">Remix</span>
              </button>
            </div>

            <div className="user-avatar">
              <div className="avatar-circle">
                <div className="avatar-placeholder">
                  {currentShort.creator.charAt(0)}
                </div>
              </div>
              <button className="subscribe-btn">
                <span>+</span>
              </button>
            </div>
          </div>

          {/* Bottom Left Info */}
          <div className="shorts-info-left">
            <div className="creator-info">
              <div className="creator-avatar-small">
                <div className="avatar-placeholder-small">
                  {currentShort.creator.charAt(0)}
                </div>
              </div>
              <span className="creator-name">@{currentShort.creator}</span>
              <button className="follow-btn">Follow</button>
            </div>

            <p className="video-title">{currentShort.title}</p>
            
            <div className="video-meta">
              <span className="audio-info">
                🎵 {currentShort.audio} • {currentShort.views} views
              </span>
            </div>

            <p className="video-description">
              {currentShort.description}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="progress-indicator">
            {shorts.map((_, i) => (
              <div 
                key={i}
                className={`progress-bar ${i === currentShortIndex ? 'active' : ''}`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button className="nav-btn prev-btn" onClick={prevShort}>
          ↑ Previous
        </button>
        <div className="short-counter">
          {currentShortIndex + 1} / {shorts.length}
        </div>
        <button className="nav-btn next-btn" onClick={nextShort}>
          ↓ Next
        </button>
      </div>

      {/* Navigation Instructions */}
      <div className="navigation-instructions">
        <p>💡 Use mouse wheel, arrow buttons, or swipe to navigate</p>
      </div>
    </div>
  );
};

export default Shorts;