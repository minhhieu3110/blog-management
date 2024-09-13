import ListMyBlog from "./ListMyBlog";
import {Outlet} from "react-router-dom";

export default function MyBlog(){
    return(
        <div className='my-blog-container'>
            <div className="list-my-blog">
                <ListMyBlog/>
            </div>
            <div className="content-my-blog">
                <Outlet/>
            </div>
        </div>
    )
}