import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import Loader from '../componnents/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';

const Post = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPosts, isLoading, error] = useFetching(async (id) =>{
        const responce = await PostService.getById(id);
        setPost(responce.data);
    });

    const [fetchComm, isCommLoading, errorComm] = useFetching(async (id) =>{
        const responce = await PostService.getCommentById(id);
        setComments(responce.data);
    });

    useEffect(() => {
        fetchPosts(params.id);
        fetchComm(params.id);
    }, []);

    return (
        <div>
            <div>
                {isLoading 
                ? <Loader/> 
                : <div><h1>Here is your post id = {params.id}</h1>{post.id}. {post.title}</div>}
            </div>
            <h1>Comments</h1>
            <div>
                {isCommLoading 
                    ? <Loader/> 
                    : <div>{comments.map(comm =>
                        <div key={comm.id} style={{marginTop:'15px'}}>
                            <h3>Author: {comm.name}.</h3>
                            <h4>{comm.body}</h4>
                        </div>)}
                    </div>}
            </div>
        </div>
    );
};

export default Post;