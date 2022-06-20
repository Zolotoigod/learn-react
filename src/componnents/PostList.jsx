import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PostItem from "./PostItem";
import '../styles/app.css'

function PostList({posts, title, remove}){
    if(!posts.length){
        return(
            <h1 style={{textAlign: 'center'}}>Records not found!</h1>
        )
    }

    return(
        <div className="App">
            <h1 style={{textAlign: "center"}}>{title}</h1>
            <TransitionGroup className='condition'>
                {posts.map((post, index) => 
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="item">
                        <PostItem remove={remove} number={index + 1} post={post}/>
                    </CSSTransition>                    
                )}
            </TransitionGroup>
        </div>
    )
}

export default PostList;