import React, { useEffect, useRef, useState } from "react";
import PostService from "../API/PostService";
import PostFilter from "../componnents/PostFilter";
import PostForm from "../componnents/PostForm";
import PostList from "../componnents/PostList";
import MyButton from "../componnents/UI/Button/MyButton";
import Loader from "../componnents/UI/Loader/Loader";
import MyModal from "../componnents/UI/MyModal/MyModal";
import { useFetching } from "../hooks/useFetching";
import { usePosts } from "../hooks/usePosts";
import { getTotalPages } from "../helpers/getTotalPages";
import Pagination from "../componnents/UI/Pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../componnents/UI/Select/MySelect";

function Posts() {
  // initial state of array
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({sort:'', query:''});
  const [modal, setModal] = useState(false);
  const sortedSerachedPosts = usePosts(posts, filter.sort, filter.query);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurretnPage] = useState(1);
  const lastElement = useRef();

  const [fetchPosts, isLoading, error] = useFetching(async () => {
    const responce = await PostService.getAll(limit, currentPage);
    setPosts([...posts, ...responce.data]);
    const allPages = getTotalPages(responce.headers['x-total-count'], limit);
    setTotalPage(allPages);
  });

  useObserver(
    lastElement,
    currentPage < totalPage,
    isLoading,
    () => setCurretnPage(currentPage + 1));

  useEffect(()=>{
    fetchPosts();
  }, [currentPage, limit])

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
      <div>
        <MySelect
          value={limit}
          onChange={value => setLimit(value)}
          defaultValue='Element by page'
          options={[
            {value:5, name:'5'},
            {value:10, name:'10'},
            {value:20, name:'20'},
            {value:-1, name:'all'},
          ]}
        />
      </div>
      <MyButton style={{marginLeft:'300px', marginTop:'25px'}} onClick={() => setModal(true)}>Add new post</MyButton>
    </div>
    <hr style={{margin: '15px'}}></hr>
    <PostList posts={sortedSerachedPosts} title='My posts' remove={remove}/>
    <div ref = {lastElement} style={{height: 20, background: 'red'}}></div>
    {isLoading &&
       <div style={{display:'flex', justifyContent:'center', marginTop: '50px'}}><Loader/></div>}
    
    <Pagination totalPage={totalPage} currentPage={currentPage} changePage={setCurretnPage}/>
   </div>
  );
}

export default Posts;