import { Link } from 'react-router-dom';
import './community.css';

const allPosts = [
  {
    id: 1,
    author: '🌱 GreenWarrior',
    time: '2 hours ago',
    text: 'Just organized a beach cleanup drive with 50+ volunteers. Together we can make our planet cleaner!',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac',
    alt: 'Beach Cleanup',
    likes: 45,
    comments: 12,
  },
  {
    id: 2,
    author: '🌿 EcoFriend',
    time: '5 hours ago',
    text: 'Planted 100 trees in our locality today. Every tree counts!',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7',
    alt: 'Plant Trees',
    likes: 32,
    comments: 8,
  },
  {
    id: 3,
    author: '♻ NatureLover',
    time: '1 day ago',
    text: "Let's reduce plastic usage and switch to sustainable alternatives.",
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952',
    alt: 'Recycle',
    likes: 28,
    comments: 6,
  },
  {
    id: 4,
    author: '🌍 CitySeeder',
    time: '2 days ago',
    text: 'Started a community garden initiative that now feeds local families every weekend.',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735',
    alt: 'Community Garden',
    likes: 21,
    comments: 4,
  },
  {
    id: 5,
    author: '🌞 SolarSpark',
    time: '3 days ago',
    text: 'Shared solar-powered lighting ideas with 20 nearby homes to reduce energy consumption.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e',
    alt: 'Solar Energy',
    likes: 19,
    comments: 5,
  },
  {
    id: 6,
    author: '💧 WaterSaver',
    time: '4 days ago',
    text: 'Started a rainwater harvesting project that is already helping our neighborhood gardens.',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d',
    alt: 'Water Harvesting',
    likes: 17,
    comments: 3,
  },
];

function CommunityPosts() {
  return (
    <div className='community-page'>
      <div className='community-header'>
        <h1>All Community Posts</h1>
        <p>Browse stories, updates, and inspiring actions from the EcoVoice community.</p>
      </div>

      <div className='posts-toolbar'>
        <Link className='back-link' to='/community'>← Back to Community</Link>
        <div className='view-links'>
          <a className='view-link' href='#posts-grid'>View all posts</a>
          <a className='view-link' href='#posts-grid'>View all pictures</a>
        </div>
      </div>

      <div className='posts posts-grid' id='posts-grid'>
        {allPosts.map((post) => (
          <div className='post' key={post.id}>
            <h3>{post.author}</h3>
            <small>{post.time}</small>
            <p>{post.text}</p>
            <a href={post.image} target='_blank' rel='noreferrer'>
              <img src={post.image} alt={post.alt} />
            </a>
            <div className='likes'>
              👍 {post.likes} &nbsp;&nbsp; 💬 {post.comments}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityPosts;
