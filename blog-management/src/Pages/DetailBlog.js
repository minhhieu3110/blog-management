import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import PersonIcon from "../Icon/PersonIcon";
import {formatTime} from "../Custom/util/FormatTime";
import LikeIcon from "../Icon/LikeIcon";
import {MyContext} from "../MyContext";

export default function DetailBlog(){
    const {id} = useParams();
    const [detailPost, setDetailPost] = useState({});
    const {isLike, setIsLike, currentUser} = useContext(MyContext);
    
    const interact = async (postId, username) => {
        const url = isLike
            ? `http://localhost:3000/posts/${postId}/unlike`
            : `http://localhost:3000/posts/${postId}/like`;
        try {
            await axios.post(url, { id: postId, username });
            setIsLike(!isLike);
        } catch (error) {
            console.error(error);
        }
    };
    
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
            <div className="interact" onClick={() => interact(detailPost.id, currentUser.username)}>
                <LikeIcon />
            </div>
        </div>
    );
}
