import React, {useState} from "react";
import MyButton from "./UI/Button/MyButton";
import MyInput from "./UI/Input/MyInput";

const PostForm = ({addPost}) => {
    const [post, setPost] = useState({title:'', body:''});

    function addPosts(event){
      event.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
      addPost(newPost);
      setPost({title:'', body:''});
    }

    return(
    <form>
      {/*управляемый компоннент!!*/}
      <MyInput value={post.title} onChange={event=> setPost({...post, title: event.target.value})} type='text' placeholder='Post name'/>
      <MyInput value={post.body} onChange={event=> setPost({...post, body: event.target.value})} type='text' placeholder='Post description'/>
      <MyButton onClick={addPosts}>Add post</MyButton>
    </form>
    );
}

export default PostForm