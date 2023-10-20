import React, { useState } from 'react';
import axios from 'axios';

function HomeScreen({ onPostSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () =>{
    axios
      .get(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
      .then((response) => {
        setSearchResults(response.data.hits);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return(
    <div className="container text-center mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <input type="text" className="form-control" placeholder="Search Hacker News" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="col-md-1">
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <ul className="list-group mt-3">
        {searchResults.map((result) =>(
          <li key={result.objectID} onClick={() => onPostSelect(result)} className="list-group-item list-group-item-action" > {result.title} </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeScreen;