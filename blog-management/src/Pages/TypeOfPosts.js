import {useParams} from "react-router-dom";
import {useContext, useState} from "react";
import {formatTime} from "../Custom/util/FormatTime";
import LikeIcon from "../Icon/LikeIcon";
import {MyContext} from "../MyContext";
import useInteract from "../Custom/hooks/useInteract";
import useListBlog from "../Custom/hooks/useListBlog";
import PersonIcon from "../Icon/PersonIcon";

export default function TypeOfPosts() {
    const {type} = useParams();
    const {currentUser, likes, isLogin} = useContext(MyContext);
    const {interact} = useInteract();
    const {listBlog} = useListBlog('http://localhost:3000/posts')
    const filterPostsByType = listBlog.filter((post) => post.type === type && post.status === 'public');
    return (
        <div className="posts-type">
            {filterPostsByType.length > 0 ? (
                filterPostsByType.map((post, index) => (
                    <div className="post" key={index}>
                        <div className='author'>
                            <PersonIcon/> &ensp;{post.username} - {formatTime(post.createAt)}
                        </div>
                        <div className='title'>{post.title}</div>
                        <div className="content" dangerouslySetInnerHTML={{__html: post.content}}/>
                        <div className={!isLogin ? 'disabled' : 'interact'}
                             onClick={() => interact(post.id, currentUser.username)}>
                            <LikeIcon isLike={likes[post.id]}/>
                        </div>
                    </div>
                ))
            ) : (
                <p>Không có bài viết nào thuộc loại này.</p>
            )}
        </div>
    );
}
