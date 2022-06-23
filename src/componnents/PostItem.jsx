import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./UI/Button/MyButton";

function PostItem(props){
    const navigate = useNavigate();

    return(
        <div className="post">
            <div className="post_content">
                <strong>{props.post.id}. </strong>
                <strong>{props.post.title}</strong>
                <h2>{props.post.body}</h2>
            </div>
            <div className="post_btn">
                <MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>Open</MyButton>
                <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
            </div>
        </div>
    )
}

export default PostItem