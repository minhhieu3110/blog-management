import useListBlog from "../../Custom/hooks/useListBlog";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {MyContext} from "../../MyContext";
import axios from "axios";

export default function ListMyBlog(){
    const {listBlog,getData} = useListBlog('http://localhost:3000/posts', 10);
    const {currentUser, removeLike} = useContext(MyContext)
    const myPosts = listBlog.filter((post)=> post.username === currentUser.username)
    const removePost = (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            axios.delete(`http://localhost:3000/posts/${id}`)
                .then((res) => {
                    removeLike(id)
                    getData();
                })
                .catch((error) => {
                    console.error( error);
                });
        }
    }
    
    return(
        <>
            <ol className='list-post'>
                {myPosts.map((post, index) => (
                    <li className='title-post' key={index}>
                        <div className='title'>
                            <span>{index + 1}</span>.
                            <Link to={`my-posts/${post.id}`}>{post.title}</Link>
                        </div>
                        <div className="dropdown-title">
                            <button className='drop-btn'>...</button>
                            <div className="dropdown-content">
                                <Link to={`edit-post/${post.id}`}>Sửa</Link><br/>
                                <Link onClick={()=>removePost(post.id)}>Xóa</Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </>
    )
}