import useListBlog from "../../Custom/hooks/useListBlog";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {MyContext} from "../../MyContext";

export default function ListMyBlog(){
    const {listBlog} = useListBlog('http://localhost:3000/posts', 10);
    const {currentUser} = useContext(MyContext)
    const myPosts = listBlog.filter((post)=> post.username === currentUser.username)
    return(
        <>
            <h4 style={{textAlign: 'center'}}>List My Blog</h4>
            <ol>
                {myPosts.map((post, index) => (
                    <li>
                        <span>{index + 1}</span>.
                        <Link to={`my-posts/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ol>
        </>
    )
}