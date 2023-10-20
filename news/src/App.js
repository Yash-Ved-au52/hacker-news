import React, { useState } from 'react';
import HomeScreen from './components/Home';
import PostDetailScreen from './components/PostDetail';

function App() {
  const [selectedPost, setSelectedPost] = useState(null);

  const navigateToPostDetail = (post) => {
    setSelectedPost(post);
  };

  const navigateToHome = () => {
    setSelectedPost(null);
  };

  return (
    <div className="App">
      {/* <h1>Hacker News Search</h1> */}
      {selectedPost ? (
        <PostDetailScreen post={selectedPost} onBack={navigateToHome} />
      ) : (
        <HomeScreen onPostSelect={navigateToPostDetail} />
      )}
    </div>
  );
}

export default App;
