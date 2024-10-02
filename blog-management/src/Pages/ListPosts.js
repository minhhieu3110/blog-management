import LikeIcon from "../Icon/LikeIcon";
import PersonIcon from "../Icon/PersonIcon";
import {formatTime} from "../Custom/util/FormatTime";
import {useContext} from "react";
import {MyContext} from "../MyContext";
import useInteract from "../Custom/hooks/useInteract";
import useListBlog from "../Custom/hooks/useListBlog";
import {Link} from "react-router-dom";

export default function ListPosts() {
    const { listBlog} = useListBlog('http://localhost:3000/posts');
    const publicPosts = listBlog.filter((post)=> post.status === 'public')
    const { interact } = useInteract();
    const { currentUser, likes, isLogin } = useContext(MyContext)
    return (
        <div className='posts'>
            {publicPosts.map((post, index) => {
                return(
                    <div className='post' key={index}>
                        <div className='author'>
                            <PersonIcon/> &ensp;{post.username} - {formatTime(post.createAt)}
                        </div>
                        <div className='title'>{post.title}</div>
                        <div className="content" dangerouslySetInnerHTML={{__html: post.content}}/>
                        <div className={!isLogin ? 'disabledInteract' : 'interact'}
                             onClick={() => interact(post.id, currentUser.username)}>
                            <LikeIcon isLike={likes[post.id] }/>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
