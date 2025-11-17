import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Subscriptions.css';

const Subscriptions = () => {
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const [channelVideos, setChannelVideos] = useState({});
  const navigate = useNavigate();

  // Mock videos data (same as Home.jsx)
  const allVideos = [
    {
      id: 1,
      title: "Amazing science experiment with water 💧",
      channel: "ScienceFun",
      views: "3.2M",
      timestamp: "3 days ago",
      duration: "0:45",
      thumbnail: "🔬",
      youtubeId: "R6pYV5RvV_s",
      likes: "185K",
      subscribers: "1.5M",
      description: "Watch how colors mix in this cool experiment!",
      category: "Education"
    },
    {
      id: 2,
      title: "Funny dog trying to catch bubbles 🐶",
      channel: "PetAdventures", 
      views: "4.7M",
      timestamp: "1 week ago",
      duration: "0:38",
      thumbnail: "🐕",
      youtubeId: "Xq1f1Nl2_bc",
      likes: "320K",
      subscribers: "2.3M",
      description: "This golden retriever never gives up!",
      category: "Pets"
    },
    {
      id: 3,
      title: "Easy magic trick with paper ✨",
      channel: "MagicForAll",
      views: "2.8M",
      timestamp: "2 days ago",
      duration: "0:52",
      thumbnail: "🎩",
      youtubeId: "mAKsZ26SabQ",
      likes: "168K",
      subscribers: "890K",
      description: "Learn this simple magic trick in 30 seconds!",
      category: "Entertainment"
    },
    {
      id: 4,
      title: "5-minute workout for beginners 💪",
      channel: "FitLife",
      views: "5.1M",
      timestamp: "1 month ago",
      duration: "1:15",
      thumbnail: "🏃‍♂️",
      youtubeId: "rLfWl8uDnYI",
      likes: "290K",
      subscribers: "3.7M",
      description: "No equipment needed! Perfect for starting your fitness journey.",
      category: "Fitness"
    },
    {
      id: 5,
      title: "Advanced chemistry experiments 🧪",
      channel: "ScienceFun",
      views: "1.8M",
      timestamp: "5 days ago",
      duration: "1:20",
      thumbnail: "🔬",
      youtubeId: "dQw4w9WgXcQ",
      likes: "95K",
      subscribers: "1.5M",
      description: "Take your science skills to the next level!",
      category: "Education"
    },
    {
      id: 6,
      title: "Cat vs Laser Pointer 😹",
      channel: "PetAdventures",
      views: "6.2M",
      timestamp: "2 weeks ago",
      duration: "0:41",
      thumbnail: "🐱",
      youtubeId: "9bZkp7q19f0",
      likes: "420K",
      subscribers: "2.3M",
      description: "Watch these cats chase the red dot!",
      category: "Pets"
    }
  ];

  // Load subscribed channels and their videos
  useEffect(() => {
    const savedSubscriptions = localStorage.getItem('subscribedChannels');
    if (savedSubscriptions) {
      const channels = JSON.parse(savedSubscriptions);
      setSubscribedChannels(channels);
      
      // Group videos by channel
      const videosByChannel = {};
      channels.forEach(channel => {
        videosByChannel[channel] = allVideos.filter(video => video.channel === channel);
      });
      setChannelVideos(videosByChannel);
    }
  }, []);

  // Unsubscribe function
  const handleUnsubscribe = (channelName) => {
    const updatedSubscriptions = subscribedChannels.filter(channel => channel !== channelName);
    setSubscribedChannels(updatedSubscriptions);
    localStorage.setItem('subscribedChannels', JSON.stringify(updatedSubscriptions));
    
    // Update channel videos
    const updatedVideos = { ...channelVideos };
    delete updatedVideos[channelName];
    setChannelVideos(updatedVideos);
  };

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  if (subscribedChannels.length === 0) {
    return (
      <div className="subscriptions-page">
        <div className="no-subscriptions">
          <div className="empty-icon">📺</div>
          <h2>No subscriptions yet</h2>
          <p>Subscribe to channels to see their videos here!</p>
          <button 
            className="browse-btn"
            onClick={() => navigate('/')}
          >
            Browse Videos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="subscriptions-page">
      <div className="subscriptions-header">
        <h1>Your Subscriptions</h1>
        <p>Videos from channels you follow</p>
      </div>

      <div className="channels-list">
        {subscribedChannels.map(channel => (
          <div key={channel} className="channel-section">
            <div className="channel-header">
              <div className="channel-info">
                <div className="channel-avatar">
                  {channel.charAt(0)}
                </div>
                <div className="channel-details">
                  <h2 className="channel-name">{channel}</h2>
                  <p className="channel-stats">
                    {channelVideos[channel]?.length || 0} videos • {channelVideos[channel]?.[0]?.subscribers || '1M'} subscribers
                  </p>
                </div>
              </div>
              <button 
                className="unsubscribe-btn"
                onClick={() => handleUnsubscribe(channel)}
              >
                Unsubscribe
              </button>
            </div>

            <div className="channel-videos">
              {channelVideos[channel]?.length > 0 ? (
                <div className="videos-grid">
                  {channelVideos[channel].map(video => (
                    <div 
                      key={video.id} 
                      className="video-card"
                      onClick={() => handleVideoClick(video.id)}
                    >
                      <div className="video-thumbnail">
                        <div className="thumbnail-icon">{video.thumbnail}</div>
                        <span className="video-duration">{video.duration}</span>
                      </div>
                      <div className="video-info">
                        <h3 className="video-title">{video.title}</h3>
                        <p className="video-views">{video.views} views • {video.timestamp}</p>
                        <div className="video-stats">
                          {video.likes} likes
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-videos">
                  <p>No videos available from {channel}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;