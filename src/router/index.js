import Main from "../pages/Main";
import Posts from "../pages/Posts";
import Post from "../pages/Post";
import Login from "../pages/Login";

export const routes =[
    {path: '/', element: <Main/>, expect: true},
    {path: '/login', element: <Login/>, expect: true},
]

export const privateRoutes =[
    {path: '/posts', element: <Posts/>, expect: true},
    {path: '/posts/:id', element: <Post/>, expect: true},
]