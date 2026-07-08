import React from "react";
import { Link } from "react-router-dom";
import "./community.css";
 
function Community() {
  return (
    <div className="community-page">
 
      {/* Header */}
      <div className="community-header">
        <h1>Community</h1>
        <p>Connect, share and make a difference together.</p>
      </div>
 
      {/* Top Cards */}
      <div className="top-cards">
 
        <div className="card">
          <h3>💬 Discussions</h3>
          <p>Join conversations and share your ideas.</p>
        </div>
 
        <div className="card">
          <h3>📅 Events</h3>
          <p>Find and join local environmental events.</p>
        </div>
 
        <div className="card">
          <h3>👥 Groups</h3>
          <p>Join or create groups for local action.</p>
        </div>
 
        <div className="card">
          <h3>🙋 Volunteers</h3>
          <p>Find volunteer opportunities.</p>
        </div>
 
        <div className="card">
          <h3>📖 Success Stories</h3>
          <p>Be inspired by real impact stories.</p>
        </div>
 
      </div>
 
      {/* Featured Posts */}
      <div className="posts-header">
        <h2>Featured Community Posts</h2>
        <Link to="/community/posts">View All Posts →</Link>
      </div>
 
      <div className="posts">
 
        <div className="post">
          <h3>🌱 GreenWarrior</h3>
          <small>2 hours ago</small>
          <p>
            Just organized a beach cleanup drive with 50+ volunteers.
            Together we can make our planet cleaner!
          </p>
          <a href="https://images.unsplash.com/photo-1529156069898-49953e39b3ac" target="_blank" rel="noreferrer">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac"
              alt="Beach Cleanup"
            />
          </a>
          <div className="likes">
            👍 45 &nbsp;&nbsp; 💬 12
          </div>
        </div>
 
        <div className="post">
          <h3>🌿 EcoFriend</h3>
          <small>5 hours ago</small>
          <p>
            Planted 100 trees in our locality today.
            Every tree counts!
          </p>
          <a href="https://images.unsplash.com/photo-1466611653911-95081537e5b7" target="_blank" rel="noreferrer">
            <img
              src="https://images.unsplash.com/photo-1466611653911-95081537e5b7"
              alt="Plant Trees"
            />
          </a>
          <div className="likes">
            👍 32 &nbsp;&nbsp; 💬 8
          </div>
        </div>
 
        <div className="post">
          <h3>♻ NatureLover</h3>
          <small>1 day ago</small>
          <p>
            Let's reduce plastic usage and switch to sustainable alternatives.
          </p>
          <a href="https://images.unsplash.com/photo-1581578731548-c64695cc6952" target="_blank" rel="noreferrer">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
              alt="Recycle"
            />
          </a>
          <div className="likes">
            👍 28 &nbsp;&nbsp; 💬 6
          </div>
        </div>
 
      </div>
 
      {/* Bottom Banner */}
 
      <div className="banner">
        <div>
          <h2>Be the Change. Join the Movement.</h2>
          <p>Your voice and actions can create a better tomorrow.</p>
        </div>
 
        <button>Join Community</button>
      </div>
 
    </div>
  );
}
 
export default Community;
 