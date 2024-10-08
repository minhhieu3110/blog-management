import './App.css'
import Header from "./Components/Header";
import {Route, Routes} from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CreateBlog from "./Pages/CreateBlog";
import MyBlog from "./Pages/my-blog-management/MyBlog";
import DetailBlog from "./Pages/DetailBlog";
import Home from "./Pages/Home";
import DetailMyBlog from "./Pages/my-blog-management/DetailMyBlog";
import ListPosts from "./Pages/ListPosts";
import EditPost from "./Pages/my-blog-management/EditPost";
import ForgotPassword from "./Pages/ForgotPassword";
import ResultSearch from "./Pages/ResultSearch";
import TypeOfPosts from "./Pages/TypeOfPosts";

export default function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path='' element={<Home/>}>
                    <Route path='' element={<ListPosts/>}/>
                    <Route path='posts/:id' element={<DetailBlog/>}/>
                    <Route path='typePosts/:type' element={<TypeOfPosts/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='register' element={<Register/>}/>
                    <Route path='forgot-password' element={<ForgotPassword/>}/>
                    <Route path='create-blog' element={<CreateBlog/>}/>
                    <Route path='search' element={<ResultSearch/>}/>
                </Route>
                <Route path='my-blog' element={<MyBlog/>}>
                    <Route path='my-posts/:id' element={<DetailMyBlog/>}/>
                    <Route path='edit-post/:id' element={<EditPost/>}/>
                </Route>
            </Routes>
        </>
    )
}