import {useContext} from "react";
import {MyContext} from "../MyContext";
import PersonIcon from "../Icon/PersonIcon";
import {formatTime} from "../Custom/util/FormatTime";
import LikeIcon from "../Icon/LikeIcon";
import useInteract from "../Custom/hooks/useInteract";

export default function ResultSearch(){
    const { currentUser, likes, isLogin, searchResults } = useContext(MyContext)
    const { interact } = useInteract();
    return(
        <div className='search-results'>
            {searchResults.map((post, index)=> (
                <div className='post' key={index}>
                    <div className='author'>
                        <PersonIcon/> &ensp;{post.username} - {formatTime(post.createAt).toLocaleString()}
                    </div>
                    <div className='title'>{post.title}</div>
                    <div className="content" dangerouslySetInnerHTML={{__html: post.content}}/>
                    <div className={!isLogin ? 'disabled' : 'interact'}
                         onClick={() => interact(post.id, currentUser.username)}>
                        <LikeIcon isLike={likes[post.id]}/>
                    </div>
                </div>
            ))}
        </div>
    )
}