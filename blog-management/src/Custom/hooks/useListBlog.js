import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {MyContext} from "../../MyContext";

export default function useListBlog(urlBlog, interval = 5000) {
    const [listBlog, setListBlog] = useState([]);
    const {likes, setLikes} = useContext(MyContext)
    const getData =  () => {
        axios.get(urlBlog).then((res) => {
            setListBlog(res.data)
        })
            .catch(err => console.log(err));
    };
    
    useEffect(() => {
        getData();
        
        const fetchInterval = setInterval(() => {
            getData();
        }, interval);
        
        return () => clearInterval(fetchInterval);
    }, [urlBlog, interval]);
    
    return { listBlog, getData };
}
