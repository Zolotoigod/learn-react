import React from "react";
import MyButton from "./UI/Button/MyButton";

function PostItem(props){ 

    return(
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. </strong>
                <strong>{props.post.title}</strong>
                <h2>{props.post.body}</h2>
            </div>
            <div className="post__btn">
                <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
            </div>
        </div>
    )
}

export default PostItem