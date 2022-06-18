import React, { useState } from "react";
import PostForm from "./componnents/PostForm";
import PostList from "./componnents/PostList";
import './styles/app.css'

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title:'JavaScript', body:'Description'},
    {id: 2, title:'JavaScript 2', body:'Description'},
    {id: 3, title:'JavaScript 3', body:'Description'},
  ]);

  // callback функция позволяет получать данные из компоннентов!!
  const addPost =(newPost) => {
    setPosts([...posts, newPost]);
  }

  const remove = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  return (
   <div className="App">
    <PostList posts={posts} title='My posts' remove={remove}/>
    <PostForm addPost={addPost}/>
   </div>
  );
}

export default App;
