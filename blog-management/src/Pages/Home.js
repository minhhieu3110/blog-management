import {Outlet} from "react-router-dom";
import RecentBlog from "../Components/RecentBlog";
import Types from "../Components/Types";

export default function Home(){
    return (
        <div className='main-container'>
            <div className="recent-types">
                <div className='recent'>
                    <RecentBlog/>
                </div>
                <div className="types">
                    <Types/>
                </div>
            </div>
            <div className="content-blog">
                <Outlet/>
            </div>
        </div>
    )
}