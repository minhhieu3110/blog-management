import useListBlog from "../Custom/hooks/useListBlog";
import {Link} from "react-router-dom";

export default function ListBlog(){
    const {listBlog, } = useListBlog('http://localhost:3000/posts', 10);
    const publicPosts = listBlog.filter((post)=>post.status === 'public')
    return(
        <>
            <h4 style={{textAlign: 'center'}}>List blog</h4>
            <ol>
                {publicPosts.map((post, index) => (
                    <li key={index}>
                        <span>{index + 1}</span>.
                        <Link to={`posts/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ol>
        </>
    )
}