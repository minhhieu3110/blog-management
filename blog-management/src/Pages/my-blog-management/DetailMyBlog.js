import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {MyContext} from "../../MyContext";
import PersonIcon from "../../Icon/PersonIcon";
import {formatTime} from "../../Custom/util/FormatTime";
import LikeIcon from "../../Icon/LikeIcon";


export default function DetailMyBlog(){
    const {id} = useParams();
    const [detailMyPost, setDetailMyPost] = useState({});
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
                setDetailMyPost(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);
    
    return (
        <div className='detail-post'>
            <div className='author'>
                <PersonIcon /> &ensp;{detailMyPost.username} - {formatTime(detailMyPost.createAt)}
            </div>
            <div className='title'>{detailMyPost.title}</div>
            <div className="content" dangerouslySetInnerHTML={{ __html: detailMyPost.content }} />
            <div className="interact" onClick={() => interact(detailMyPost.id, currentUser.username)}>
                <LikeIcon />
            </div>
        </div>
    );
}
