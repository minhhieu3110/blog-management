import {useContext} from "react";
import LikeIcon from "../../Icon/LikeIcon";
import {formatTime} from "../../Custom/util/FormatTime";
import PersonIcon from "../../Icon/PersonIcon";
import {MyContext} from "../../MyContext";
import useInteract from "../../Custom/hooks/useInteract";
import useListBlog from "../../Custom/hooks/useListBlog";

export default function ListMyPosts() {
    const { listBlog } = useListBlog('http://localhost:3000/posts')
    const { currentUser, likes } = useContext(MyContext);
    const listMyPosts = listBlog.filter((post)=> post.username === currentUser.username)
    const { interact } = useInteract();
    
    
    return (
        <div className='posts'>
            {listMyPosts.map((post, index) => (
                <div className='post' key={index}>
                    <div className='author'>
                        <PersonIcon/> &ensp;{post.username} - {formatTime(post.createAt)} - Types: {post.type}
                    </div>
                    <div className='title'>{post.title}</div>
                    <div className="content" dangerouslySetInnerHTML={{ __html: post.content }} />
                    <div className='interact' onClick={() => interact(post.id, currentUser.username)}>
                        <LikeIcon isLike={likes[post.id] || false} />
                    </div>
                </div>
            ))}
        </div>
    );
}
