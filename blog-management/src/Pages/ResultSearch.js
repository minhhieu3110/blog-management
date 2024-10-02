import {useContext} from "react";
import {MyContext} from "../MyContext";
import PersonIcon from "../Icon/PersonIcon";
import {formatTime} from "../Custom/util/FormatTime";
import LikeIcon from "../Icon/LikeIcon";
import useInteract from "../Custom/hooks/useInteract";

export default function ResultSearch() {
    const { currentUser, likes, isLogin, searchResults } = useContext(MyContext);
    const { interact } = useInteract();
    return (
        <div className='search-results'>
            {searchResults.length > 0 ?
                searchResults.map((post, index) => (
                    <div className='post' key={index}>
                        <div className='author'>
                            <PersonIcon/> &ensp;{post.username} - {formatTime(post.createAt)} - Types: {post.type}
                        </div>
                        <div className='title'>{post.title}</div>
                        <div className="content" dangerouslySetInnerHTML={{__html: post.content}}></div>
                        <div className={!isLogin ? 'disabledInteract' : 'interact'}
                             onClick={() => interact(post.id, currentUser.username)}>
                            <LikeIcon isLike={likes[post.id]}/>
                        </div>
                    </div>
                ))
                :
                <h2 style={{textAlign:'center'}}>Không tìm thấy bài đăng</h2>
            }
        </div>
    );
}
