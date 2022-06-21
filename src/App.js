import React, { useEffect, useState } from "react";
import PostService from "./API/PostService";
import PostFilter from "./componnents/PostFilter";
import PostForm from "./componnents/PostForm";
import PostList from "./componnents/PostList";
import MyButton from "./componnents/UI/Button/MyButton";
import Loader from "./componnents/UI/Loader/Loader";
import MyModal from "./componnents/UI/MyModal/MyModal";
import { useFetching } from "./hooks/useFetching";
import { usePosts } from "./hooks/usePosts";
import { getTotalPages } from "./helpers/getTotalPages";
import './styles/app.css'
import Pagination from "./componnents/UI/Pagination/Pagination";

function App() {
  // initial state of array
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({sort:'', query:''});
  const [modal, setModal] = useState(false);
  const sortedSerachedPosts = usePosts(posts, filter.sort, filter.query);
  const limit = 10;
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurretnPage] = useState(1);

  const [fetchPosts, isLoading, error] = useFetching(async () => {
    const responce = await PostService.GetAll(limit, currentPage);
    setPosts(responce.data);
    const allPages = getTotalPages(responce.headers['x-total-count'], limit);
    setTotalPage(allPages);
  });

  useEffect(()=>{
    fetchPosts();
  }, [currentPage])

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
    {error && <div>Error {error}</div>}

    <div style={{marginTop: '30px', display:'flex', justifyContent:'between'}}>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <MyButton style={{marginLeft:'300px', marginTop:'25px'}} onClick={() => setModal(true)}>Add new post</MyButton>
    </div>
    <hr style={{margin: '15px'}}></hr>
    {isLoading 
    ? <div style={{display:'flex', justifyContent:'center', marginTop: '50px'}}><Loader/></div> 
    : <PostList posts={sortedSerachedPosts} title='My posts' remove={remove}/> }
    
    <Pagination totalPage={totalPage} currentPage={currentPage} changePage={setCurretnPage}/>
   </div>
  );
}

export default App;
