import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './History.css';

const mockHistoryVideos = [
  {
    id: 1,
    title: "React Tutorial for Beginners - Learn React in 2024",
    channel: "CodeWithMe",
    views: "1.2M",
    timestamp: "3 days ago",
    duration: "15:30",
    thumbnail: "⚛️",
    youtubeId: "w7ejDZ8SWv8",
    likes: "45K",
    subscribers: "500K",
    description: "Learn React from scratch in this comprehensive tutorial for beginners.",
    category: "Programming",
    watchedAt: "2024-01-15T10:30:00Z",
    progress: 85
  },
  {
    id: 2,
    title: "JavaScript Masterclass 2024 - Advanced Concepts",
    channel: "JSExpert",
    views: "2.8M",
    timestamp: "1 week ago",
    duration: "45:22",
    thumbnail: "📜",
    youtubeId: "Mus_vwhTCq0",
    likes: "120K",
    subscribers: "1.2M",
    description: "Deep dive into advanced JavaScript concepts and patterns.",
    category: "Programming",
    watchedAt: "2024-01-14T15:20:00Z",
    progress: 60
  },
  {
    id: 3,
    title: "The First YouTube Video - Me at the zoo",
    channel: "jawed",
    views: "268M",
    timestamp: "18 years ago",
    duration: "0:19",
    youtubeId: "jNQXAC9IVRw",
    likes: "11M",
    subscribers: "1.2M",
    description: "The very first video uploaded to YouTube",
    category: "History",
    watchedAt: "2024-01-13T20:15:00Z",
    progress: 100
  },
  {
    id: 4,
    title: "CSS Animations That Will Blow Your Mind",
    channel: "WebDesignPro",
    views: "1.5M",
    timestamp: "1 month ago",
    duration: "22:15",
    thumbnail: "🎨",
    youtubeId: "YszONjKpgg4",
    likes: "85K",
    subscribers: "800K",
    description: "Create stunning CSS animations with these advanced techniques.",
    category: "Design",
    watchedAt: "2024-01-12T09:45:00Z",
    progress: 45
  },
  {
    id: 5,
    title: "Python for Data Science - Complete Course",
    channel: "DataMaster",
    views: "3.2M",
    timestamp: "2 months ago",
    duration: "52:10",
    thumbnail: "🐍",
    youtubeId: "LHBE6Q9XlzI",
    likes: "150K",
    subscribers: "2.1M",
    description: "Complete Python course for data science and machine learning.",
    category: "Data Science",
    watchedAt: "2024-01-10T14:20:00Z",
    progress: 30
  },
  {
    id: 6,
    title: "Building a YouTube Clone with React",
    channel: "ReactMaster",
    views: "890K",
    timestamp: "5 days ago",
    duration: "28:33",
    thumbnail: "📺",
    youtubeId: "F627pKNUCVQ",
    likes: "42K",
    subscribers: "450K",
    description: "Learn how to build a YouTube clone using React and modern web technologies.",
    category: "Programming",
    watchedAt: "2024-01-09T16:30:00Z",
    progress: 75
  }
];

const History = () => {
  const [historyVideos, setHistoryVideos] = useState([]);
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const navigate = useNavigate();

  // Load history and subscriptions from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('watchHistory');
    const savedSubscriptions = localStorage.getItem('subscribedChannels');
    
    if (savedHistory) {
      setHistoryVideos(JSON.parse(savedHistory));
    } else {
      // Use mock data if no history exists
      setHistoryVideos(mockHistoryVideos);
      localStorage.setItem('watchHistory', JSON.stringify(mockHistoryVideos));
    }
    
    if (savedSubscriptions) {
      setSubscribedChannels(JSON.parse(savedSubscriptions));
    }
  }, []);

  const handleSubscribe = (channelName, e) => {
    e.stopPropagation();
    
    const updatedSubscriptions = [...subscribedChannels];
    const isSubscribed = updatedSubscriptions.includes(channelName);
    
    if (isSubscribed) {
      const index = updatedSubscriptions.indexOf(channelName);
      updatedSubscriptions.splice(index, 1);
    } else {
      updatedSubscriptions.push(channelName);
    }
    
    setSubscribedChannels(updatedSubscriptions);
    localStorage.setItem('subscribedChannels', JSON.stringify(updatedSubscriptions));
  };

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  const clearHistory = () => {
    setHistoryVideos([]);
    localStorage.setItem('watchHistory', JSON.stringify([]));
  };

  const removeFromHistory = (videoId, e) => {
    e.stopPropagation();
    const updatedHistory = historyVideos.filter(video => video.id !== videoId);
    setHistoryVideos(updatedHistory);
    localStorage.setItem('watchHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className="history">
      <div className="history-header">
        <h1>Watch History</h1>
        {historyVideos.length > 0 && (
          <button className="clear-history-btn" onClick={clearHistory}>
            🗑️ Clear All History
          </button>
        )}
      </div>

      {historyVideos.length > 0 ? (
        <div className="history-videos-grid">
          {historyVideos.map(video => {
            const isSubscribed = subscribedChannels.includes(video.channel);
            
            return (
              <div 
                key={video.id} 
                className="history-video-card"
                onClick={() => handleVideoClick(video.id)}
              >
                <div className="video-thumbnail">
                  <img 
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="thumbnail-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.nextElementSibling;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="thumbnail-fallback">
                    <div className="fallback-content">
                      <span className="fallback-icon">{video.thumbnail}</span>
                    </div>
                  </div>
                  <span className="video-duration">{video.duration}</span>
                  
                  {/* Progress bar for watched videos */}
                  {video.progress > 0 && (
                    <div className="watch-progress">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${video.progress}%` }}
                      ></div>
                    </div>
                  )}

                  <button 
                    className={`subscribe-btn-history ${isSubscribed ? 'subscribed' : ''}`}
                    onClick={(e) => handleSubscribe(video.channel, e)}
                  >
                    {isSubscribed ? '✓ Subscribed' : '+ Subscribe'}
                  </button>

                  <button 
                    className="remove-history-btn"
                    onClick={(e) => removeFromHistory(video.id, e)}
                    title="Remove from history"
                  >
                    ×
                  </button>
                </div>
                
                <div className="video-info">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-channel">{video.channel} • {video.views} views • {video.timestamp}</p>
                  <p className="video-stats">{video.likes} likes • {video.subscribers} subscribers</p>
                  <div className="video-category">{video.category}</div>
                  
                  {/* Subscription Status */}
                  <div className="history-video-footer">
                    {isSubscribed && (
                      <span className="subscription-status">Subscribed</span>
                    )}
                    <span className="watched-time">
                      Watched {new Date(video.watchedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-history">
          <div className="no-history-icon">📚</div>
          <h3>No watch history</h3>
          <p>Videos you watch will appear here</p>
          <button 
            className="browse-videos-btn"
            onClick={() => navigate('/')}
          >
            Browse Videos
          </button>
        </div>
      )}
    </div>
  );
};

export default History;