import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Home.css';

const mockVideos = [
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
    category: "Programming"
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
    category: "Programming"
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
    category: "History"
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
    category: "Design"
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
    category: "Data Science"
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
    category: "Programming"
  }
];

const Home = () => {
  const [videos, setVideos] = useState(mockVideos);
  const [filteredVideos, setFilteredVideos] = useState(mockVideos);
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Load subscribed channels from localStorage
  useEffect(() => {
    const savedSubscriptions = localStorage.getItem('subscribedChannels');
    if (savedSubscriptions) {
      setSubscribedChannels(JSON.parse(savedSubscriptions));
    }
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search');
    
    if (searchTerm) {
      const filtered = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.channel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos(videos);
    }
  }, [location.search, videos]);

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

  return (
    <div className="home">
      {location.search && (
        <div className="search-results-info">
          <h3>Search Results</h3>
          <p>Found {filteredVideos.length} videos</p>
        </div>
      )}
      
      <div className="videos-grid">
        {filteredVideos.map(video => {
          const isSubscribed = subscribedChannels.includes(video.channel);
          
          return (
            <div 
              key={video.id} 
              className="video-card"
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
                    <span className="fallback-text">{video.title}</span>
                  </div>
                </div>
                <span className="video-duration">{video.duration}</span>
                
                <button 
                  className={`subscribe-btn-home ${isSubscribed ? 'subscribed' : ''}`}
                  onClick={(e) => handleSubscribe(video.channel, e)}
                >
                  {isSubscribed ? '✓ Subscribed' : '+ Subscribe'}
                </button>
              </div>
              
              <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                <p className="video-channel">{video.channel} • {video.views} views • {video.timestamp}</p>
                <p className="video-stats">{video.likes} likes • {video.subscribers} subscribers</p>
                <div className="video-category">{video.category}</div>
                
                {isSubscribed && (
                  <div className="subscription-badge">
                    ✓ Subscribed
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredVideos.length === 0 && (
        <div className="no-videos">
          <div className="no-videos-icon">🔍</div>
          <h3>No videos found</h3>
          <p>Try adjusting your search terms or browse different categories</p>
        </div>
      )}
    </div>
  );
};

export default Home;