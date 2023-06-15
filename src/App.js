import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts" 
});

const App = () => {
  const [title, setTitle] = useState('');
   const [body, setBody] = useState('');
   const [posts, setPosts] = useState([]);

  // GET with Axios
   useEffect(() => {
    const fetchPost = async () => {
      try {
         let response = await client.get('?_limit=10');
         setPosts(response.data);
      } catch (error) {
         console.log(error);
      }
   };
   fetchPost();
 }, []);

  // DELETE with Axios
   const deletePost = async (id) => {
    try{
      await client.delete(`${id}`);
      setPosts(
         posts.filter((post) => {
            return post.id !== id;
         })
      );
    } catch(error) {
      console.log(error);
    }   
   };
    
   // handle form submission
   const handleSubmit = (e) => {
      e.preventDefault();
      addPosts(title, body);
   };

   // POST with Axios
   const addPosts = async (title, body) => {
    try{
      let response = await client.post('', {
         title: title,
         body: body,
      });
      setPosts([response.data, ...posts]);
      setTitle('');
      setBody('');
    } catch {
      console.log(error);
    }   
   };

  return (
    <div className="app">
    <h2>All Posts 📫</h2>
      {posts.map((post) => {
        return (
            <div className="post-card" key={post.id}>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-body">{post.body}</p>
              <div className="button">
                  <div className="delete-btn" onClick = {deletePost(post.id)}> Delete</div>
              </div>
            </div>
        );
      })}
    </div>
  );
};

export default App;
