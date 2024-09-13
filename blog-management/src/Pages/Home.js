import ListBlog from "../Components/ListBlog";
import {Outlet} from "react-router-dom";

export default function Home(){
    return (
        <div className='main-container'>
            <div className="list-blog">
                <ListBlog/>
            </div>
            <div className="content-blog">
                <Outlet/>
            </div>
        </div>
    )
}