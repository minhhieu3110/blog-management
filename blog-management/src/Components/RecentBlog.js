import useListBlog from "../Custom/hooks/useListBlog";
import {Link} from "react-router-dom";

export default function RecentBlog(){
    const {listBlog, } = useListBlog('http://localhost:3000/posts',);
    const publicPosts = listBlog
        .filter((post)=>post.status === 'public')
        .reverse()
        .splice(0, 4)
    return(
        <>
            <h4 style={{textAlign:'center', marginBottom:'15px'}}>Recent Posts</h4>
            <ul className='recent-posts'>
                {publicPosts.map((post, index) => (
                    <li className='title-all-post' key={index}>
                            <Link to={`posts/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}