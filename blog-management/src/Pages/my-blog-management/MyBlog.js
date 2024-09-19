import ListMyBlog from "./ListMyBlog";
import {Outlet, useLocation} from "react-router-dom";
import ListMyPosts from "./ListMyPosts";

export default function MyBlog(){
    const location = useLocation().pathname === '/my-blog';
    return(
        <div className='my-blog-container'>
            <div className="list-my-blog">
                <ListMyBlog/>
            </div>
            <div className="content-my-blog">
                {location ? <ListMyPosts/> : <Outlet/>}
            </div>
        </div>
    )
}