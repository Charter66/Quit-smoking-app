import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.reddit.com/');
        const $ = cheerio.load(response.data);
        const postTitles = [];

        $('div[data-testid="post-container"] h3').each((index, element) => {
          const title = $(element).text();
          postTitles.push(title);
        });

        setPosts(postTitles);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Scraped Reddit Post Titles</h1>
      <ul>
        {posts && posts.map((post, index) => (
          <li key={index}>{post}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
