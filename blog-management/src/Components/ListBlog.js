import useListBlog from "../Custom/hooks/useListBlog";
import {Link} from "react-router-dom";

export default function ListBlog(){
    const {listBlog, } = useListBlog('http://localhost:3000/posts',);
    const publicPosts = listBlog.filter((post)=>post.status === 'public')
    return(
        <>
            <ol className='list-post'>
                {publicPosts.map((post, index) => (
                    <li className='title-all-post' key={index}>
                        <div className='title-post-all' key={index}>
                            <span>{index + 1}</span>.
                            <Link to={`posts/${post.id}`}>{post.title}</Link>
                        </div>
                    </li>
                ))}
            </ol>
        </>
    )
}