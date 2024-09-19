import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {MyContext} from "../../MyContext";
import PersonIcon from "../../Icon/PersonIcon";
import {formatTime} from "../../Custom/util/FormatTime";
import LikeIcon from "../../Icon/LikeIcon";
import useInteract from "../../Custom/hooks/useInteract";


export default function DetailMyBlog(){
    const {id} = useParams();
    const [detailMyPost, setDetailMyPost] = useState({});
    const { currentUser, likes} = useContext(MyContext);
    const {interact} = useInteract()
    useEffect(() => {
        const fetchPost = () => {
            axios.get(`http://localhost:3000/posts/${id}`)
                .then((res) => {
                    setDetailMyPost(res.data);
                })
                .catch((err) => {
                    if (err.response && err.response.status === 404) {
                        setDetailMyPost(null); // Nếu bài viết không tồn tại
                    } else {
                        console.error(err);
                    }
                });
        };
        
        const intervalId = setInterval(fetchPost, 5000);
        
        fetchPost();
        
        return () => clearInterval(intervalId);
    }, [id]);
    
    
    
    return (
        <div className='detail-post'>
            {detailMyPost === null
                ? "Không tìm thấy bài viết"
                : <>
                    <div className='author'>
                        <PersonIcon /> &ensp;{detailMyPost.username} - {formatTime(detailMyPost.createAt)}
                    </div>
                    <div className='title'>{detailMyPost.title}</div>
                    <div className="content" dangerouslySetInnerHTML={{ __html: detailMyPost.content }} />
                    <div className="interact" onClick={() => interact(detailMyPost.id, currentUser.username)}>
                        <LikeIcon isLike={likes[detailMyPost.id]} />
                    </div>
                </>
            }
        </div>
    );
    
}
