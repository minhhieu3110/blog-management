import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import PersonIcon from "../Icon/PersonIcon";
import {formatTime} from "../Custom/util/FormatTime";
import LikeIcon from "../Icon/LikeIcon";
import {MyContext} from "../MyContext";
import useInteract from "../Custom/hooks/useInteract";

export default function DetailBlog(){
    const {id} = useParams();
    const [detailPost, setDetailPost] = useState({});
    const { currentUser, likes, isLogin } = useContext(MyContext);
    const { interact } = useInteract();
    
    useEffect(() => {
        axios.get(`http://localhost:3000/posts/${id}`)
            .then((res) => {
                setDetailPost(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);
    
    return (
        <div className='detail-post'>
            <div className='author'>
                <PersonIcon /> &ensp;{detailPost.username} - {formatTime(detailPost.createAt)}
            </div>
            <div className='title'>{detailPost.title}</div>
            <div className="content" dangerouslySetInnerHTML={{ __html: detailPost.content }} />
            <div className={!isLogin ? 'disabled' : 'interact'} onClick={() => interact(detailPost.id, currentUser.username)}>
                <LikeIcon isLike={likes[detailPost.id]}/>
            </div>
        </div>
    );
}
