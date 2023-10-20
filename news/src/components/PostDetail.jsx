import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostDetailScreen({ post, onBack }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentPromises = post.children.map(commentId =>
        axios.get(`http://hn.algolia.com/api/v1/items/${commentId}`)
      );

      const commentResponses = await Promise.all(commentPromises);
      const commentTexts = commentResponses.map(response => response.data.text);

      setComments(commentTexts);
    };

    fetchComments();
  }, [post.children]);

  return (
    <div>
      <nav className="mb-3 mt-2 border-bottom" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><button className="btn btn-link" onClick={onBack}>Home</button></li>
        </ol>
      </nav>
    <div className='p-4'>
      <h2>{post.title}</h2>
      <p>Points: {post.points}</p>
      <h3>Comments:</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: comment }}></li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default PostDetailScreen;
