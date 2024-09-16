import {useContext} from "react";
import {MyContext} from "../../MyContext";
import axios from "axios";

export default function useInteract() {
    const {likes, setLikes} = useContext(MyContext);
    
    const interact = async (postId, username) => {
        const isLiked = likes[postId];
        const url = isLiked
            ? `http://localhost:3000/posts/${postId}/unlike`
            : `http://localhost:3000/posts/${postId}/like`;
        
        try {
            await axios.post(url, { id: postId, username });
            
            setLikes(prevLikes => ({
                ...prevLikes,
                [postId]: !isLiked
            }));
        } catch (error) {
            console.error(error);
        }
    };
    
    return { interact };
}
