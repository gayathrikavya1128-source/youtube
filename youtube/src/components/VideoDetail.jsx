import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VideoDetail.css';

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likes, setLikes] = useState(45000);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'ReactFan', text: 'Great tutorial! Very helpful!', likes: 45, timestamp: '2 hours ago' },
    { id: 2, user: 'CodeNewbie', text: 'Thanks for making this easy to understand!', likes: 23, timestamp: '5 hours ago' }
  ]);

  const videosData = {
    1: {
      id: 1,
      title: "React Tutorial for Beginners - Learn React in 2024",
      channel: "CodeWithMe",
      views: "1.2M",
      timestamp: "3 days ago",
      youtubeId: "w7ejDZ8SWv8",
      likes: "45K",
      subscribers: "500K",
      description: "Learn React from scratch in this comprehensive tutorial for beginners. We'll cover everything from components and props to hooks and state management.",
      category: "Programming"
    },
    2: {
      id: 2,
      title: "JavaScript Masterclass 2024 - Advanced Concepts",
      channel: "JSExpert",
      views: "2.5M",
      timestamp: "1 week ago", 
      youtubeId: "Mus_vwhTCq0",
      likes: "120K",
      subscribers: "1.2M",
      description: "Deep dive into advanced JavaScript concepts and patterns.",
      category: "Programming"
    },
    3: {
      id: 3,
      title: "Node.js Crash Course - Build REST API",
      channel: "BackendDev", 
      views: "750K",
      timestamp: "2 weeks ago",
      youtubeId: "H6M5eRckyGU",
      likes: "35K",
      subscribers: "300K",
      description: "Learn Node.js by building a complete REST API from scratch.",
      category: "Backend"
    },
    4: {
      id: 4,
      title: "CSS Animations That Will Blow Your Mind",
      channel: "WebDesignPro",
      views: "1.5M", 
      timestamp: "1 month ago",
      youtubeId: "YszONjKpgg4",
      likes: "85K",
      subscribers: "800K",
      description: "Create stunning CSS animations with these advanced techniques.",
      category: "Design"
    },
    5: {
      id: 5,
      title: "Python for Data Science - Complete Course",
      channel: "DataMaster",
      views: "3.2M",
      timestamp: "2 months ago",
      youtubeId: "LHBE6Q9XlzI",
      likes: "150K", 
      subscribers: "2.1M",
      description: "Complete Python course for data science and machine learning.",
      category: "Data Science"
    },
    6: {
      id: 6,
      title: "Building a YouTube Clone with React",
      channel: "ReactMaster",
      views: "890K",
      timestamp: "5 days ago",
      youtubeId: "F627pKNUCVQ",
      likes: "42K",
      subscribers: "450K",
      description: "Learn how to build a YouTube clone using React and modern web technologies.",
      category: "Programming"
    }
  };

  const video = videosData[id] || videosData[1];

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: 'You',
        text: comment,
        likes: 0,
        timestamp: 'Just now'
      };
      setComments([newComment, ...comments]);
      setComment('');
    }
  };

  const formatLikes = (likes) => {
    if (likes >= 1000) {
      return (likes / 1000).toFixed(1) + 'K';
    }
    return likes.toString();
  };

  return (
    <div className="video-detail">
      <div className="video-container">
        <div className="video-player">
          <div className="youtube-iframe-container">
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="video-info-detailed">
          <h1 className="video-title-detailed">{video.title}</h1>
          
          <div className="video-actions">
            <div className="video-stats-detailed">
              <span>{video.views} views</span>
              <span className="dot">•</span>
              <span>{video.timestamp}</span>
            </div>
            
            <div className="action-buttons">
              <button 
                className={`action-btn ${isLiked ? 'liked' : ''}`}
                onClick={handleLike}
              >
                👍 {formatLikes(likes)}
              </button>
              <button className="action-btn">
                👎
              </button>
              <button className="action-btn">
                🔗 Share
              </button>
              <button className="action-btn">
                ⬇️ Download
              </button>
            </div>
          </div>

          <div className="channel-info">
            <div className="channel-details">
              <div className="channel-avatar">
                {video.channel.charAt(0)}
              </div>
              <div className="channel-meta">
                <h3 className="channel-name">{video.channel}</h3>
                <p className="channel-subs">{video.subscribers} subscribers</p>
              </div>
            </div>
            <button 
              className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
              onClick={handleSubscribe}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          <div className="video-description">
            <p>{video.description}</p>
          </div>
        </div>

        <div className="comments-section">
          <h3 className="comments-title">
            {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
          </h3>
          
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="comment-submit">
              Comment
            </button>
          </form>

          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-avatar">
                  {comment.user.charAt(0)}
                </div>
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-user">{comment.user}</span>
                    <span className="comment-time">{comment.timestamp}</span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                  <div className="comment-actions">
                    <button className="comment-like">👍 {comment.likes}</button>
                    <button className="comment-reply">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="suggested-videos">
        <h3>Suggested Videos</h3>
        {Object.values(videosData)
          .filter(v => v.id !== video.id)
          .slice(0, 5)
          .map(suggestedVideo => (
            <div 
              key={suggestedVideo.id} 
              className="suggested-video"
              onClick={() => navigate(`/video/${suggestedVideo.id}`)}
            >
              <div className="suggested-thumbnail">
                <img 
                  src={`https://img.youtube.com/vi/${suggestedVideo.youtubeId}/hqdefault.jpg`}
                  alt={suggestedVideo.title}
                  className="thumbnail-image"
                />
                <span className="suggested-duration">{suggestedVideo.duration}</span>
              </div>
              <div className="suggested-info">
                <h4>{suggestedVideo.title}</h4>
                <p>{suggestedVideo.channel}</p>
                <p>{suggestedVideo.views} views • {suggestedVideo.timestamp}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VideoDetail;