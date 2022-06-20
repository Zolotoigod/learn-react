import React, { useState } from "react";
import PostFilter from "./componnents/PostFilter";
import PostForm from "./componnents/PostForm";
import PostList from "./componnents/PostList";
import MyButton from "./componnents/UI/Button/MyButton";
import MyModal from "./componnents/UI/MyModal/MyModal";
import { usePosts } from "./hooks/usePosts";
import './styles/app.css'

function App() {
  // initial state of array
  const [posts, setPosts] = useState([
    {id: 1, title:'JavaScript', body:'Web'},
    {id: 2, title:'C#', body:'Enterprise'},
    {id: 3, title:'Pyton', body:'Scripts'},
  ]);

  const [filter, setFilter] = useState({sort:'', query:''});
  const [modal, setModal] = useState(false);
  const sortedSerachedPosts = usePosts(posts, filter.sort, filter.query);

  // useMemo выполняет вычисления и кэщирует результат
  // перенесен в отдельный хук
  // const sortedPosts = useMemo(() => {
  //   console.log("Get sorted post");
  //   if(filter.sort){
  //     return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
  //   }

  //   return posts;
  // },[filter.sort, posts]);

  // const sortedSerachedPosts = useMemo(() =>{
  //   return  sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query));
  // },[filter.query, sortedPosts]);

  // callback функция позволяет получать данные из компоннентов!!
  const addPost =(newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const remove = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  return (
   <div className="App">
    <MyModal visible={modal} setVisible={setModal}>
      <PostForm addPost={addPost}/>
    </MyModal>

    <PostFilter filter={filter} setFilter={setFilter}/>
    <hr style={{margin: '15px'}}></hr>
    <PostList posts={sortedSerachedPosts} title='My posts' remove={remove}/>
    <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>Add new post</MyButton>
    
   </div>
  );
}

export default App;
