import useListBlog from "../Custom/hooks/useListBlog";
import {Link} from "react-router-dom";

export default function Types(){
    const {listBlog} = useListBlog('http://localhost:3000/posts')
    const uniqueTypesPost = [...new Set(listBlog.map((post) => post.type))];
    return(
        <>
            <h4 style={{textAlign: 'center', marginBottom: '15px'}}>Types Post</h4>
            <ul className='recent-posts'>
                {uniqueTypesPost.map((type, index) => (
                    <li className='title-all-post' key={index}>
                        <Link to={`typePosts/${type}`}>{type}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}